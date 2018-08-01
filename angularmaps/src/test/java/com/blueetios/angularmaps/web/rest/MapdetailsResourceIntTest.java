package com.blueetios.angularmaps.web.rest;

import com.blueetios.angularmaps.AngularmapsApp;

import com.blueetios.angularmaps.domain.Mapdetails;
import com.blueetios.angularmaps.repository.MapdetailsRepository;
import com.blueetios.angularmaps.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MapdetailsResource REST controller.
 *
 * @see MapdetailsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AngularmapsApp.class)
public class MapdetailsResourceIntTest {

    private static final String DEFAULT_LONGITUDE = "AAAAAAAAAA";
    private static final String UPDATED_LONGITUDE = "BBBBBBBBBB";

    private static final String DEFAULT_LATITUDE = "AAAAAAAAAA";
    private static final String UPDATED_LATITUDE = "BBBBBBBBBB";

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    private static final String DEFAULT_INCOMPLIANCES = "AAAAAAAAAA";
    private static final String UPDATED_INCOMPLIANCES = "BBBBBBBBBB";

    @Autowired
    private MapdetailsRepository mapdetailsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restMapdetailsMockMvc;

    private Mapdetails mapdetails;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        MapdetailsResource mapdetailsResource = new MapdetailsResource(mapdetailsRepository);
        this.restMapdetailsMockMvc = MockMvcBuilders.standaloneSetup(mapdetailsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Mapdetails createEntity() {
        Mapdetails mapdetails = new Mapdetails()
            .longitude(DEFAULT_LONGITUDE)
            .latitude(DEFAULT_LATITUDE)
            .label(DEFAULT_LABEL)
            .incompliances(DEFAULT_INCOMPLIANCES);
        return mapdetails;
    }

    @Before
    public void initTest() {
        mapdetailsRepository.deleteAll();
        mapdetails = createEntity();
    }

    @Test
    public void createMapdetails() throws Exception {
        int databaseSizeBeforeCreate = mapdetailsRepository.findAll().size();

        // Create the Mapdetails
        restMapdetailsMockMvc.perform(post("/api/mapdetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mapdetails)))
            .andExpect(status().isCreated());

        // Validate the Mapdetails in the database
        List<Mapdetails> mapdetailsList = mapdetailsRepository.findAll();
        assertThat(mapdetailsList).hasSize(databaseSizeBeforeCreate + 1);
        Mapdetails testMapdetails = mapdetailsList.get(mapdetailsList.size() - 1);
        assertThat(testMapdetails.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
        assertThat(testMapdetails.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
        assertThat(testMapdetails.getLabel()).isEqualTo(DEFAULT_LABEL);
        assertThat(testMapdetails.getIncompliances()).isEqualTo(DEFAULT_INCOMPLIANCES);
    }

    @Test
    public void createMapdetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mapdetailsRepository.findAll().size();

        // Create the Mapdetails with an existing ID
        mapdetails.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restMapdetailsMockMvc.perform(post("/api/mapdetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mapdetails)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Mapdetails> mapdetailsList = mapdetailsRepository.findAll();
        assertThat(mapdetailsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllMapdetails() throws Exception {
        // Initialize the database
        mapdetailsRepository.save(mapdetails);

        // Get all the mapdetailsList
        restMapdetailsMockMvc.perform(get("/api/mapdetails?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mapdetails.getId())))
            .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE.toString())))
            .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE.toString())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL.toString())))
            .andExpect(jsonPath("$.[*].incompliances").value(hasItem(DEFAULT_INCOMPLIANCES.toString())));
    }

    @Test
    public void getMapdetails() throws Exception {
        // Initialize the database
        mapdetailsRepository.save(mapdetails);

        // Get the mapdetails
        restMapdetailsMockMvc.perform(get("/api/mapdetails/{id}", mapdetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mapdetails.getId()))
            .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE.toString()))
            .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE.toString()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL.toString()))
            .andExpect(jsonPath("$.incompliances").value(DEFAULT_INCOMPLIANCES.toString()));
    }

    @Test
    public void getNonExistingMapdetails() throws Exception {
        // Get the mapdetails
        restMapdetailsMockMvc.perform(get("/api/mapdetails/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateMapdetails() throws Exception {
        // Initialize the database
        mapdetailsRepository.save(mapdetails);
        int databaseSizeBeforeUpdate = mapdetailsRepository.findAll().size();

        // Update the mapdetails
        Mapdetails updatedMapdetails = mapdetailsRepository.findOne(mapdetails.getId());
        updatedMapdetails
            .longitude(UPDATED_LONGITUDE)
            .latitude(UPDATED_LATITUDE)
            .label(UPDATED_LABEL)
            .incompliances(UPDATED_INCOMPLIANCES);

        restMapdetailsMockMvc.perform(put("/api/mapdetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMapdetails)))
            .andExpect(status().isOk());

        // Validate the Mapdetails in the database
        List<Mapdetails> mapdetailsList = mapdetailsRepository.findAll();
        assertThat(mapdetailsList).hasSize(databaseSizeBeforeUpdate);
        Mapdetails testMapdetails = mapdetailsList.get(mapdetailsList.size() - 1);
        assertThat(testMapdetails.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
        assertThat(testMapdetails.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testMapdetails.getLabel()).isEqualTo(UPDATED_LABEL);
        assertThat(testMapdetails.getIncompliances()).isEqualTo(UPDATED_INCOMPLIANCES);
    }

    @Test
    public void updateNonExistingMapdetails() throws Exception {
        int databaseSizeBeforeUpdate = mapdetailsRepository.findAll().size();

        // Create the Mapdetails

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMapdetailsMockMvc.perform(put("/api/mapdetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mapdetails)))
            .andExpect(status().isCreated());

        // Validate the Mapdetails in the database
        List<Mapdetails> mapdetailsList = mapdetailsRepository.findAll();
        assertThat(mapdetailsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteMapdetails() throws Exception {
        // Initialize the database
        mapdetailsRepository.save(mapdetails);
        int databaseSizeBeforeDelete = mapdetailsRepository.findAll().size();

        // Get the mapdetails
        restMapdetailsMockMvc.perform(delete("/api/mapdetails/{id}", mapdetails.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Mapdetails> mapdetailsList = mapdetailsRepository.findAll();
        assertThat(mapdetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mapdetails.class);
        Mapdetails mapdetails1 = new Mapdetails();
        mapdetails1.setId("id1");
        Mapdetails mapdetails2 = new Mapdetails();
        mapdetails2.setId(mapdetails1.getId());
        assertThat(mapdetails1).isEqualTo(mapdetails2);
        mapdetails2.setId("id2");
        assertThat(mapdetails1).isNotEqualTo(mapdetails2);
        mapdetails1.setId(null);
        assertThat(mapdetails1).isNotEqualTo(mapdetails2);
    }
}
