using FoECalculator;

public static class CalculadoraPoder
{
    public static double CalcularTotalPower(Predio p)
    {
        int somaBases = p.RedBaseAttack + p.RedBaseDefense + p.BlueBaseAttack + p.BlueBaseDefense;
        int somaRestante =
            p.RedCBGAttack + p.RedCBGDefense + p.BlueCBGAttack + p.BlueCBGDefense +
            p.RedEXPAttack + p.RedEXPDefense + p.BlueEXPAttack + p.BlueEXPDefense +
            p.RedIQAttack + p.RedIQDefense + p.BlueIQAttack + p.BlueIQDefense;

        int total = 2 * somaBases + somaRestante;

        return total / (double)p.TotalEspaco;
    }
}
