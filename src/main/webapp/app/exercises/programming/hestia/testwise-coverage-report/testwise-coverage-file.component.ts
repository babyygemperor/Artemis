import { Component, Input, ViewChild, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { AceEditorComponent } from 'app/shared/markdown-editor/ace-editor/ace-editor.component';
import ace from 'brace';
import { CoverageFileReport } from 'app/entities/hestia/coverage-file-report.model';
import { ThemeService } from 'app/core/theme/theme.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'jhi-testwise-coverage-file',
    templateUrl: './testwise-coverage-file.component.html',
    styleUrls: ['./testwise-coverage-file.component.scss'],
})
export class TestwiseCoverageFileComponent implements OnInit, OnChanges, OnDestroy {
    @Input()
    fileContent: string;

    @Input()
    fileName: string;

    @Input()
    fileReport: CoverageFileReport;

    @ViewChild('editor', { static: true })
    editor: AceEditorComponent;

    proportionCoveredLines: number;

    themeSubscription: Subscription;

    constructor(private themeService: ThemeService) {}

    ngOnInit(): void {
        this.setupEditor();
        this.renderFile();
        this.themeSubscription = this.themeService.getCurrentThemeObservable().subscribe((theme) => {
            this.editor.setTheme(theme.codeAceTheme);
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.fileReport || changes.fileContent) {
            this.renderFile();
        }
    }

    ngOnDestroy(): void {
        this.themeSubscription?.unsubscribe();
    }

    private aggregateCoveredLinesBlocks(fileReport: CoverageFileReport): Map<number, number> {
        const coveredLines = new Set<number>();
        const entries = fileReport.testwiseCoverageEntries!;
        // retrieve all covered line numbers
        entries.forEach((entry) => {
            this.getRangeArray(entry.startLine!, entry.lineCount!).forEach((line) => coveredLines.add(line));
        });

        // build the blocks
        const orderedLines = Array.from(coveredLines).sort();
        const startLineByLength = new Map<number, number>();

        // set the covered line ratio accordingly
        this.proportionCoveredLines = orderedLines.length / this.fileReport!.lineCount!;

        let index = 0;
        while (index < orderedLines.length) {
            const currentBlockStartLine = orderedLines[index];
            let currentBlockLength = 1;
            let continueBlock = true;

            // count the length of the consecutive blocks
            while (continueBlock && index < orderedLines.length) {
                if (index + 1 === orderedLines.length) {
                    continueBlock = false;
                } else if (orderedLines[index + 1] === orderedLines[index] + 1) {
                    currentBlockLength++;
                } else {
                    continueBlock = false;
                }
                index++;
            }
            startLineByLength.set(currentBlockStartLine, currentBlockLength);
        }

        return startLineByLength;
    }

    private getRangeArray(startLine: number, lineCount: number): number[] {
        return [...Array(lineCount).keys()].map((i) => i + startLine - 1);
    }

    private setupEditor(): void {
        this.editor.getEditor().setOptions({
            animatedScroll: true,
            maxLines: Infinity,
            highlightActiveLine: false,
            showPrintMargin: false,
        });
        ace.Range = ace.acequire('ace/range').Range;
    }

    private renderFile() {
        const session = this.editor.getEditor().getSession();
        session.setValue(this.fileContent ?? '');

        Object.entries(session.getMarkers() ?? {}).forEach(([, v]) => session.removeMarker((v as any).id));

        this.aggregateCoveredLinesBlocks(this.fileReport).forEach((blockLength, lineNumber) => {
            const range = new ace.Range(lineNumber, 0, lineNumber + blockLength - 1, 1);
            session.addMarker(range, 'ace_highlight-marker', 'fullLine');
        });
    }
}
