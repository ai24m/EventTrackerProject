package com.skilldistillery.algorithmpractice.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class LanguageTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Language language;

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
		language = em.find(Language.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		language = null;
	}

	@Test
	void test_User_mapping() {
		assertNotNull(language);
		assertEquals("Java", language.getName());
	}
}
