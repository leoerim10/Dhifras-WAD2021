import java.util.ArrayList;
import java.util.Collections;

public class Main{
    public static void main(String[] args) {
        ArrayList<Bruch> list = new ArrayList<Bruch>();
        Bruch b1 = new Bruch(2,2);
        Bruch b2 = new Bruch(6,3);
        Bruch b3 = new Bruch(1,4);
        Bruch b4 = new Bruch(1,5);
        
        list.add(b1);
        list.add(b2);
        list.add(b3);
        list.add(b4);

        Collections.sort(list);

        for(Bruch b: list){
            System.out.println(b);
        }

        //TODO: sort form smallest to biggest
    }
}