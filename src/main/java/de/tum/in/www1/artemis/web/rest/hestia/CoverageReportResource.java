package de.tum.in.www1.artemis.web.rest.hestia;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.tum.in.www1.artemis.domain.hestia.CoverageReport;
import de.tum.in.www1.artemis.repository.ProgrammingExerciseRepository;
import de.tum.in.www1.artemis.security.Role;
import de.tum.in.www1.artemis.service.AuthorizationCheckService;
import de.tum.in.www1.artemis.service.hestia.TestwiseCoverageService;

/**
 * REST controller for managing ProgrammingExerciseTestwiseCoverageReports and its entries.
 */
@RestController
@RequestMapping("api/")
public class CoverageReportResource {

    private final Logger log = LoggerFactory.getLogger(CoverageReportResource.class);

    private final TestwiseCoverageService testwiseCoverageService;

    private final ProgrammingExerciseRepository programmingExerciseRepository;

    private final AuthorizationCheckService authCheckService;

    public CoverageReportResource(TestwiseCoverageService testwiseCoverageService, ProgrammingExerciseRepository programmingExerciseRepository,
            AuthorizationCheckService authCheckService) {
        this.testwiseCoverageService = testwiseCoverageService;
        this.programmingExerciseRepository = programmingExerciseRepository;
        this.authCheckService = authCheckService;
    }

    /**
     * {@code GET exercises/:exerciseId/full-testwise-coverage-report} : Get the latest coverage report for a solution submission
     * of a programming exercise with all file reports and descendants.
     *
     * @param exerciseId the exerciseId of the exercise of which to retrieve the testwise coverage report for the latest solution submission
     * @return the {@link ResponseEntity} with status {@code 200 (Ok)} and with body the coverage report
     */
    @GetMapping("programming-exercises/{exerciseId}/full-testwise-coverage-report")
    @PreAuthorize("hasRole('EDITOR')")
    public ResponseEntity<CoverageReport> getLatestFullCoverageReport(@PathVariable Long exerciseId) {
        log.debug("REST request to get a CoverageReport for exercise {}", exerciseId);

        var exercise = programmingExerciseRepository.findByIdElseThrow(exerciseId);
        authCheckService.checkHasAtLeastRoleForExerciseElseThrow(Role.EDITOR, exercise, null);

        var reportWithFileReports = testwiseCoverageService.getFullCoverageReportForLatestSolutionSubmissionFromProgrammingExercise(exercise);
        return ResponseEntity.ok(reportWithFileReports);
    }

    /**
     * {@code GET exercises/:exerciseId/testwise-coverage-report} : Get the latest coverage report for a solution submission
     * of a programming exercise without the actual file reports.
     *
     * @param exerciseId the exerciseId of the exercise of which to retrieve the testwise coverage report for the latest solution submission
     * @return the {@link ResponseEntity} with status {@code 200 (Ok)} and with body the coverage report
     */
    @GetMapping("programming-exercises/{exerciseId}/-testwise-coverage-report")
    @PreAuthorize("hasRole('EDITOR')")
    public ResponseEntity<CoverageReport> getLatestCoverageReport(@PathVariable Long exerciseId) {
        log.debug("REST request to get a CoverageReport for exercise {}", exerciseId);

        var exercise = programmingExerciseRepository.findByIdElseThrow(exerciseId);
        authCheckService.checkHasAtLeastRoleForExerciseElseThrow(Role.EDITOR, exercise, null);

        var reportWithoutFileReports = testwiseCoverageService.getCoverageReportForLatestSolutionSubmissionFromProgrammingExercise(exercise);
        return ResponseEntity.ok(reportWithoutFileReports);
    }
}