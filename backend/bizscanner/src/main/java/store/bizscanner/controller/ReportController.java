package store.bizscanner.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import store.bizscanner.dto.response.BestPopulationResponse;
import store.bizscanner.dto.response.PopulationResponse;
import store.bizscanner.dto.response.salesResponse.BestSalesResponse;
import store.bizscanner.service.PopulationService;
import store.bizscanner.service.SalesService;

@RestController
@CrossOrigin("*")
@RequestMapping("/report")
@RequiredArgsConstructor
public class ReportController {
    private final PopulationService populationService;
    private final SalesService salesService;

    @GetMapping("/best-population/{careaCode}")
    public ResponseEntity<BestPopulationResponse> bestPopulation(@PathVariable String careaCode) {
        return new ResponseEntity<>(populationService.bestPopulation(careaCode), HttpStatus.OK);
    }

    @GetMapping("/population/{careaCode}")
    public ResponseEntity<PopulationResponse> getPopulation(@PathVariable String careaCode) {
        return new ResponseEntity<>(populationService.getPopulation(careaCode), HttpStatus.OK);
    }

    @GetMapping("best-sales-amount/{careaCode}")
    public ResponseEntity<BestSalesResponse> getBestSales(@PathVariable String careaCode) {
        return new ResponseEntity<>(salesService.getBestSales(careaCode), HttpStatus.OK);
    }
}
