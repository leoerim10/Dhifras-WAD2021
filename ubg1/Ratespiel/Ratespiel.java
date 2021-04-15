import java.util.concurrent.ThreadLocalRandom;
import java.util.Scanner;

public class Ratespiel{
    public static void main(String[] args) {
        
        int randomNum = ThreadLocalRandom.current().nextInt(0, 100 + 1);
        int i = 0;
        int num;
        while(true){
            num = getNumFromUser();
            if(num < randomNum){
                System.out.println("Number too small!");
            } 
            else if(num > randomNum){
                System.out.println("Number too big!");
            } 
            else if(num == randomNum){
                break;
            }
            i++;
        }

        System.out.println("Congratulations, you won!. It took " + i + " tries");
    
    }

    public static int getNumFromUser(){
        Scanner sc = new Scanner(System.in);
        int x;
        while(true){
            try{
                System.out.print("Input number: ");
                x = Integer.parseInt(sc.nextLine());
                break;
            } catch (NumberFormatException nfe){
                System.out.println("not a valid input, try again");
            }
        }

        return x;
    }
}