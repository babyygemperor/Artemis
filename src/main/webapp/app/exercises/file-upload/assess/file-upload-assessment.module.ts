import { NgModule } from '@angular/core';
import { ArtemisFileUploadAssessmentRoutingModule } from './file-upload-assessment.route';
import { ArtemisSharedModule } from 'app/shared/shared.module';
import { FileUploadAssessmentComponent } from './file-upload-assessment.component';
import { ArtemisAssessmentSharedModule } from 'app/assessment/assessment-shared.module';
import { FileUploadAssessmentDashboardComponent } from 'app/exercises/file-upload/assess/file-upload-assessment-dashboard.component';
import { ArtemisResultModule } from 'app/exercises/shared/result/result.module';
import { ModelingAssessmentModule } from 'app/exercises/modeling/assess/modeling-assessment.module';
import { AssessmentInstructionsModule } from 'app/assessment/assessment-instructions/assessment-instructions.module';
import { ArtemisMarkdownModule } from 'app/shared/markdown.module';
import {SubmissionDashboardTableModule} from "app/exercises/shared/assess/submission-dashboard-table.module";

@NgModule({
    imports: [
        ArtemisSharedModule,
        ArtemisResultModule,
        ArtemisAssessmentSharedModule,
        ArtemisFileUploadAssessmentRoutingModule,
        ModelingAssessmentModule,
        AssessmentInstructionsModule,
        ArtemisMarkdownModule,
        SubmissionDashboardTableModule,
    ],
    declarations: [FileUploadAssessmentComponent, FileUploadAssessmentDashboardComponent],
})
export class ArtemisFileUploadAssessmentModule {}
