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

class SolutionTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Solution solution;

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
		solution = em.find(Solution.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		solution = null;
	}

	@Test
	void test_Solution_mapping() {
		assertNotNull(solution);
		assertEquals(1, solution.getId());
	}
	
	@Test
	void test_Solution_Algorithm_ManyToOne_mapping() {
		assertNotNull(solution);
		assertNotNull(solution.getAlgorithm());
		assertEquals(1, solution.getAlgorithm().getId());
	}
	
	@Test
	void test_Solution_User_ManyToOne_mapping() {
		assertNotNull(solution);
		assertNotNull(solution.getUser());
		assertEquals(1, solution.getUser().getId());
	}
	
	@Test
	void test_Solution_Language_ManyToOne_mapping() {
		assertNotNull(solution);
		assertNotNull(solution.getLanguage());
		assertEquals(3, solution.getLanguage().getId());
	}
}
