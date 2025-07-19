using System;

public static class PowerEvaluator
{
    private const string FIX_MSG = "Baseado no poder no Neo Colosso n.8, que é de 35,05,";

    public static void AvaliarEPublicar(double totalPower)
    {
        var nivel = AvaliarNivel(totalPower);

        string mensagem = nivel switch
        {
            PowerLevel.HIGH => $"{FIX_MSG} esse prédio é considerado um dos melhores disponíveis no jogo.",
            PowerLevel.MEDIUM => $"{FIX_MSG} esse prédio está conforme os padrões do jogo.",
            PowerLevel.LOW => $"{FIX_MSG} esse prédio está obsoleto. Considere trocá-lo assim que possível.",
            PowerLevel.CRITICAL => $"{FIX_MSG} esse prédio está totalmente obsoleto, pode removê-lo da cidade.",
            _ => "Nível desconhecido."
        };

        ConsoleColor cor = nivel switch
        {
            PowerLevel.HIGH => ConsoleColor.Green,
            PowerLevel.MEDIUM => ConsoleColor.Yellow,
            PowerLevel.LOW => ConsoleColor.Red,
            PowerLevel.CRITICAL => ConsoleColor.Red,
            _ => ConsoleColor.White
        };

        Console.ForegroundColor = cor;
        Console.WriteLine($"\nPoder total do prédio: {totalPower:F2}");
        Console.WriteLine(mensagem);
        Console.ResetColor();
    }

    private static PowerLevel AvaliarNivel(double totalPower)
    {
        if (totalPower > PowerThresholds.HIGH) return PowerLevel.HIGH;
        if (totalPower >= PowerThresholds.MEDIUM) return PowerLevel.MEDIUM;
        if (totalPower >= PowerThresholds.LOW) return PowerLevel.LOW;
        return PowerLevel.CRITICAL;
    }
}
