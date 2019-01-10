package bean;

import org.junit.Test;

import static org.junit.Assert.*;

public class MessageTest {

    Message message1=new Message("你好，java","001.jpg","2018-12-30","zyc");

    @Test
    public void getUserName() {
        assertEquals("zyc",message1.getUserName());
    }

    @Test
    public void getImage() {
        assertEquals("001.jpg",message1.getImage());
    }

    @Test
    public void getInformation() {
        assertEquals("你好，java",message1.getInformation());
    }

    @Test
    public void getTime() {
        assertEquals("2018-12-30",message1.getTime());
    }
}