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

class UserTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private User user;

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
		user = em.find(User.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		user = null;
	}

	@Test
	void test_User_mapping() {
		assertNotNull(user);
		assertEquals("admin", user.getUsername());
	}
	
	@Test
	void test_User_Comment_OneToMany_mapping() {
		assertNotNull(user);
		assertNotNull(user.getComments());
		assertTrue(user.getComments().size() > 0);
	}
	
	@Test
	void test_User_Algorithm_OneToMany_mapping() {
		assertNotNull(user);
		assertNotNull(user.getAlgorithms());
		assertTrue(user.getAlgorithms().size() > 0);

	}
	
	@Test
	void test_User_Solution_OneToMany_mapping() {
		assertNotNull(user);
		assertNotNull(user.getSolutions());
		assertTrue(user.getSolutions().size() > 0);
	}
}
