package com.blueetios.angularmaps.repository;

import com.blueetios.angularmaps.domain.Mapdetails;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Mapdetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MapdetailsRepository extends MongoRepository<Mapdetails,String> {
    
}
