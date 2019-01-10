package bean;

import org.junit.Test;

import static org.junit.Assert.*;

public class UserTest {

    User user1=new User("zyc","123456");
    @Test
    public void getUserName() {
    assertEquals("zyc",user1.getUserName());
    }

    @Test
    public void getPassword() { assertEquals("123456",user1.getPassword());
    }
}