
public class Bruch implements Comparable<Bruch>{
    public int zahler;
    public int nenner;

    public Bruch(int zahler, int nenner){
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
        int gcd = 1;
        for(int i =1; i<this.zahler && i<this.nenner; i++){
            if(this.zahler%i==0 && this.nenner%i==0){
                gcd = i;
            }
        }

        this.zahler = 1;
        this.nenner = gcd;
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
        return 0;
    }

    public String toString(){
        return "Zahler: " + this.zahler + " Nenner: " + this.nenner;
    }

}