package com.blueetios.angularmaps.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.blueetios.angularmaps.domain.Mapdetails;

import com.blueetios.angularmaps.repository.MapdetailsRepository;
import com.blueetios.angularmaps.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Mapdetails.
 */
@RestController
@RequestMapping("/api")
public class MapdetailsResource {

    private final Logger log = LoggerFactory.getLogger(MapdetailsResource.class);

    private static final String ENTITY_NAME = "mapdetails";

    private final MapdetailsRepository mapdetailsRepository;

    public MapdetailsResource(MapdetailsRepository mapdetailsRepository) {
        this.mapdetailsRepository = mapdetailsRepository;
    }

    /**
     * POST  /mapdetails : Create a new mapdetails.
     *
     * @param mapdetails the mapdetails to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mapdetails, or with status 400 (Bad Request) if the mapdetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mapdetails")
    @Timed
    public ResponseEntity<Mapdetails> createMapdetails(@RequestBody Mapdetails mapdetails) throws URISyntaxException {
        log.debug("REST request to save Mapdetails : {}", mapdetails);
        if (mapdetails.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new mapdetails cannot already have an ID")).body(null);
        }
        Mapdetails result = mapdetailsRepository.save(mapdetails);
        return ResponseEntity.created(new URI("/api/mapdetails/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mapdetails : Updates an existing mapdetails.
     *
     * @param mapdetails the mapdetails to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mapdetails,
     * or with status 400 (Bad Request) if the mapdetails is not valid,
     * or with status 500 (Internal Server Error) if the mapdetails couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mapdetails")
    @Timed
    public ResponseEntity<Mapdetails> updateMapdetails(@RequestBody Mapdetails mapdetails) throws URISyntaxException {
        log.debug("REST request to update Mapdetails : {}", mapdetails);
        if (mapdetails.getId() == null) {
            return createMapdetails(mapdetails);
        }
        Mapdetails result = mapdetailsRepository.save(mapdetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mapdetails.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mapdetails : get all the mapdetails.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mapdetails in body
     */
    @GetMapping("/mapdetails")
    @Timed
    public List<Mapdetails> getAllMapdetails() {
        log.debug("REST request to get all Mapdetails");
        return mapdetailsRepository.findAll();
    }

    /**
     * GET  /mapdetails/:id : get the "id" mapdetails.
     *
     * @param id the id of the mapdetails to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mapdetails, or with status 404 (Not Found)
     */
    @GetMapping("/mapdetails/{id}")
    @Timed
    public ResponseEntity<Mapdetails> getMapdetails(@PathVariable String id) {
        log.debug("REST request to get Mapdetails : {}", id);
        Mapdetails mapdetails = mapdetailsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mapdetails));
    }

    /**
     * DELETE  /mapdetails/:id : delete the "id" mapdetails.
     *
     * @param id the id of the mapdetails to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mapdetails/{id}")
    @Timed
    public ResponseEntity<Void> deleteMapdetails(@PathVariable String id) {
        log.debug("REST request to delete Mapdetails : {}", id);
        mapdetailsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
