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

class TrackerTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Tracker comment;

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
		comment = em.find(Tracker.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		comment = null;
	}

	@Test
	void test_Comment_mapping() {
		assertNotNull(comment);
		assertNotNull(comment.getContent());
		assertEquals(2021, comment.getCreatedAt().getYear());
	}
	
	@Test
	void test_Comment_Algorithm_ManyToOne_mapping() {
		assertNotNull(comment);
		assertNotNull(comment.getAlgorithm());
		assertEquals(1, comment.getAlgorithm().getId());
	}
	
	@Test
	void test_Comment_User_ManyToOne_mapping() {
		assertNotNull(comment);
		assertNotNull(comment.getUser());
		assertEquals(1, comment.getUser().getId());
	}
}
