
/*bataille_navale.java
le 03.12.2023*/
import java.util.Scanner;

public class battaille_navale {
    public static void main(String[] args) {
        boolean fin = false; /* la boucle */
        while (fin == false) {
            int manche = 0;
            int scorej = 0; /* le score du joueur */
            int scoreo = 0;
            int lpj = 0; /* ligne du pion par joueur */
            int cpj = 0; /* colonne du pion par joueur */
            int r = 0;
            /* les tableaux */
            int tabjoueur[][] = new int[5][5]; /* joueur */
            int tabordi[][] = new int[5][5]; /* ordi */

            for (int i = 0; i < tabjoueur.length; i++) {
                for (int j = 0; j < tabjoueur[i].length; j++) { /* afficher le tableau du joueur */
                    tabjoueur[i][j] = 0;
                    System.out.print(tabjoueur[i][j] + " ");
                }
                System.out.println();
            }
            for (int i = 0; i < tabordi.length; i++) {
                for (int j = 0; j < tabordi.length; j++) { /* afficher le tableau de l'ordi */
                    tabordi[i][j] = 0;
                    System.out.print(tabordi[i][j] + " ");
                }
                System.out.println();
            }
            /* les pions par le joueur */
            while (r != 5) { /* boucle */

                Scanner sc = new Scanner(System.in);
                System.out.print("A vous de Jouer !");
                System.out.print(" ");
                System.out.println("A quelle ligne voulez-vous découvrir une case ?");
                lpj = sc.nextInt();

                /* les pions par l'ordi */
                int ol = (int) (Math.random() * (5)) + 1; /* nombre aléatoire pour l'ordinateur sur ligne */
                System.out.println(ol);

                Scanner a = new Scanner(System.in);
                System.out.println("A quelle colonne voulez-vous découvrir une case ?");
                cpj = a.nextInt();
                System.out.print("Tir en cours");

                /* Thread.sleep(3000); */ /* l'attente */

                /* les pions par l'ordi */
                int oc = (int) (Math.random() * (5)) + 1; /* nombre aléatoire pour l'ordinateur sur colonne */
                System.out.println(oc);

                if (lpj > 5 || cpj > 5 || lpj < 0 || cpj < 0) {
                    System.out.println("Votre choix est en dehors du tableau !");
                } else if (tabjoueur[lpj - 1][cpj - 1] == 1) {
                    System.out.println("Il y a un bateau !");
                } else {
                    tabjoueur[lpj - 1][cpj - 1] = 1;
                    r++;
                }
                r++;
                System.out.println();
                affichage(tabjoueur);
            }
            if (scorej == manche) { /* La décision du gagnant */
                System.out.println("Le joueur a gagné");
            } else if (scoreo == manche) {
                System.out.println("L'ordinateur a gagné");
            }
            int texte = -1; /* pour la boucle */
            if ((scorej == manche) || (scoreo == manche)) {
                while (texte != 0 && texte != 1) {
                    Scanner ch = new Scanner(System.in);
                    System.out.println("Voulez-vous rejouer ? 0 pour oui et 1 pour non");
                    texte = ch.nextInt();
                    if (texte == 1) {
                        fin = true;
                    }
                }
            }
        }
    }

    public static void affichage(int tabjoueur[][]) { /* procédure affichage du terrain */
        System.out.println("Terrain : ");
        System.out.print("  ");

        for (int a = 0; a < tabjoueur.length; a++) {
            System.out.print(a + 1 + "  ");
        }
        System.out.println("");
        for (int i = 0; i < tabjoueur.length; i++) {
            System.out.print(i + 1 + "  ");
            for (int j = 0; j < tabjoueur.length; j++) {
                if (tabjoueur[j][i] == 1) {
                    System.out.print("x  ");
                } else if (tabjoueur[j][i] == 0) {
                    System.out.print("?  ");
                } else {
                    System.out.print("o  ");
                }
            }
            System.out.println("");
        }
    }
}