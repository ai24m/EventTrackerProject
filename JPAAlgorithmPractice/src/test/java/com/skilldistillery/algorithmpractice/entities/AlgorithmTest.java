package com.skilldistillery.algorithmpractice.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.*;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AlgorithmTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Algorithm algorithm;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPAAlgorithmPractice");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		algorithm = em.find(Algorithm.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		algorithm = null;
	}

	@Test
	void test_Algorithm_mapping() {
		assertNotNull(algorithm);
		assertEquals("Two Number Sum", algorithm.getTitle());
	}

}