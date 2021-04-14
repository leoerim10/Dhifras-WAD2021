import java.math.BigInteger;

public class Bruch implements Comparable<Bruch>{
    public int zahler;
    public int nenner;

    public Bruch(int zahler, int nenner){
        if(nenner == 0){
            System.out.println("Nenner can not be 0");
            //throw new Exception("how to handle this?");
        }

        this.zahler = zahler;
        this.nenner = nenner;
    }

    public Bruch multiplizieren(Bruch b){
        Bruch n = new Bruch(this.zahler*b.zahler, this.nenner*b.nenner);
        return n;
    }

    public double ausrechnen(){
        return this.zahler/this.nenner;
    }

    public void kuerzen(){
        //needs ggt? not sure how to do it? 
    }

    public Bruch kehrwert(){
        Bruch n = new Bruch(this.nenner, this.zahler);
        return n;
    }

    public Bruch dividieren(Bruch b){
        return multiplizieren(kehrwert());
    }

    @Override
    public int compareTo(Bruch obj){
        //not sure about this either
        obj.kuerzen();
        this.kuerzen();

        if (this.nenner == obj.nenner) {
            return 0;
        } else if (this.nenner > obj.nenner){
            return -1;
        } else {
            return 1;
        }
    }

    public String toString(){
        return "Zahler: " + this.zahler + " Nenner: " + this.nenner + "\n";
    }

}