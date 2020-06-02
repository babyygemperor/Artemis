import { NgModule } from '@angular/core';
import { ArtemisSharedModule } from 'app/shared/shared.module';
import { ArtemisSharedComponentModule } from 'app/shared/components/shared-component.module';
import { FormDateTimePickerModule } from 'app/shared/date-time-picker/date-time-picker.module';
import { FormsModule } from '@angular/forms';
import { FeatureToggleModule } from 'app/shared/feature-toggle/feature-toggle.module';
import { ProgrammingAssessmentManualResultButtonComponent } from 'app/exercises/programming/assess/manual-result/programming-assessment-manual-result-button.component';
import { ProgrammingAssessmentRepoExportButtonComponent } from 'app/exercises/programming/assess/repo-export/programming-assessment-repo-export-button.component';
import { ProgrammingAssessmentManualResultDialogComponent } from 'app/exercises/programming/assess/manual-result/programming-assessment-manual-result-dialog.component';
import { ArtemisComplaintsForTutorModule } from 'app/complaints/complaints-for-tutor/complaints-for-tutor.module';
import { ProgrammingAssessmentRepoExportDialogComponent } from 'app/exercises/programming/assess/repo-export/programming-assessment-repo-export-dialog.component';
import { ArtemisProgrammingAssessmentRoutingModule } from 'app/exercises/programming/assess/programming-assessment.route';
import { ProgrammingAssessmentManualResultInCodeEditorComponent } from 'app/exercises/programming/assess/manual-result/programming-assessment-manual-result-in-code-editor.component';

@NgModule({
    imports: [
        ArtemisSharedModule,
        ArtemisSharedComponentModule,
        FormDateTimePickerModule,
        FormsModule,
        FeatureToggleModule,
        ArtemisComplaintsForTutorModule,
        ArtemisProgrammingAssessmentRoutingModule,
    ],
    declarations: [
        ProgrammingAssessmentManualResultButtonComponent,
        ProgrammingAssessmentManualResultDialogComponent,
        ProgrammingAssessmentRepoExportButtonComponent,
        ProgrammingAssessmentRepoExportDialogComponent,
        ProgrammingAssessmentManualResultInCodeEditorComponent,
    ],
    entryComponents: [ProgrammingAssessmentManualResultDialogComponent, ProgrammingAssessmentRepoExportDialogComponent],
    exports: [
        ProgrammingAssessmentManualResultButtonComponent,
        ProgrammingAssessmentRepoExportButtonComponent,
        ProgrammingAssessmentManualResultDialogComponent,
        ProgrammingAssessmentManualResultInCodeEditorComponent,
    ],
})
export class ArtemisProgrammingAssessmentModule {}
