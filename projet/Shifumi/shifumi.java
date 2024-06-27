/*shifumi.java
le 03.11.2023*/

import java.util.Scanner;

class shifumi {
    public static void main(String[] args) throws InterruptedException {
        boolean fin = false; /* la boucle */
        while (fin == false) {
            int manche = 0; /* les manches */
            int scorej = 0; /* le score du joueur */
            int sc = 0; /* le score de l'ordi */
            Scanner ch = new Scanner(System.in);
            while ((manche != 3) && (manche != 5) && (manche != 10)) {
                System.out.println("Combien de point doit se derouler la partie ? 3 ou 5 ou 10"); /*
                                                                                                   * le choix desmanches
                                                                                                   */
                manche = ch.nextInt();
            }
            while ((scorej < manche) && (sc < manche)) { /* Tant que le score est plus petit que la manche */
                String pfc = "";
                Scanner a = new Scanner(System.in);
                while (!pfc.equals("pierre") && !pfc.equals("feuille") && !pfc.equals("ciseaux")
                        && !pfc.equals("puits")) {
                    System.out.println("Choissisez entre pierre, feuille, ciseaux ou puits"); /* choix entre pfc */
                    pfc = a.nextLine();
                }
                Thread.sleep(3000); /* attente de réponse */
                int colonne = (int) (Math.random() * (4)) + 1; /* l'ordinateur */
                System.out.println(colonne);
                int pfcj; /* le joueur */
                if (pfc.equals("pierre")) { /* transforme le pfc en 1234 */
                    pfcj = 1;
                } else if (pfc.equals("feuille")) {
                    pfcj = 2;
                } else if (pfc.equals("ciseaux")) {
                    pfcj = 3;
                } else {
                    pfcj = 4;
                }
                System.out.println(pfcj); /* les attributions des points */
                if (pfcj == 1 && colonne == 3
                        || pfcj == 2 && colonne == 1 || pfcj == 3 && colonne == 2 || pfcj == 2 && colonne == 4
                        || pfcj == 4 && colonne == 1 || pfcj == 4 && colonne == 3) { /* gagne */
                    scorej += 1;
                    System.out.println("Tu a" + scorej + "points"); /* mon score */
                    System.out.println("L'ordi a" + sc + "points"); /* score de l'ordi */
                } else if (pfcj == 1 && colonne == 2 || pfcj == 2 && colonne == 3 || pfcj == 3 && colonne == 1
                        || pfcj == 1 && colonne == 4 || pfcj == 3 && colonne == 4) { /* perdu */
                    sc += 1;
                    System.out.println("L'ordi a" + sc + "points");
                    System.out.println("Tu a" + scorej + "points");
                } else { /* egalite */
                    System.out.println("egalite");
                }
                if (scorej == manche) { /* La décision du gagnant */
                    System.out.println("Le joueur a gagne");
                } else if (sc == manche) {
                    System.out.println("L'ordinateur a gagne");
                }
                int texte = -1; /* pour la boucle */
                if ((scorej == manche) || (sc == manche)) {
                    while (texte != 0 && texte != 1) {
                        System.out.println("Voulez-vous rejouer ? 0 pour oui et 1 pour non");
                        texte = ch.nextInt();
                        if (texte == 1) {
                            fin = true;
                        }
                    }
                }
            }
        }
    }
}