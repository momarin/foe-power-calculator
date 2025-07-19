using System.Diagnostics;

namespace FoECalculator
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var predio = new Predio();

            // Nome e espaço
            Console.Write("Nome do Prédio: ");
            predio.Name = Console.ReadLine();

            predio.Width = LerInteiro("Digite a largura do prédio (Ex: em 3x4, o 3): ");
            predio.Height = LerInteiro("Digite a altura do prédio (Ex: em 3x4, o 4): ");

            // Básico
            Console.WriteLine("\n====== PODER BÁSICO ======");
            predio.RedBaseAttack = LerInteiro("Ataque básico vermelho: ");
            predio.RedBaseDefense = LerInteiro("Defesa básica vermelha: ");
            predio.BlueBaseAttack = LerInteiro("Ataque básico azul: ");
            predio.BlueBaseDefense = LerInteiro("Defesa básica azul: ");

            // CBG
            Console.WriteLine("\n====== PODER CBG ======");
            predio.RedCBGAttack = LerInteiro("Ataque CBG vermelho: ");
            predio.RedCBGDefense = LerInteiro("Defesa CBG vermelha: ");
            predio.BlueCBGAttack = LerInteiro("Ataque CBG azul: ");
            predio.BlueCBGDefense = LerInteiro("Defesa CBG azul: ");

            // EXP
            Console.WriteLine("\n====== PODER EXP ======");
            predio.RedEXPAttack = LerInteiro("Ataque EXP vermelho: ");
            predio.RedEXPDefense = LerInteiro("Defesa EXP vermelha: ");
            predio.BlueEXPAttack = LerInteiro("Ataque EXP azul: ");
            predio.BlueEXPDefense = LerInteiro("Defesa EXP azul: ");

            // IQ
            Console.WriteLine("\n====== PODER IQ ======");
            predio.RedIQAttack = LerInteiro("Ataque IQ vermelho: ");
            predio.RedIQDefense = LerInteiro("Defesa IQ vermelha: ");
            predio.BlueIQAttack = LerInteiro("Ataque IQ azul: ");
            predio.BlueIQDefense = LerInteiro("Defesa IQ azul: ");

            // Espaço total
            Console.WriteLine($"\nEspaço total: {predio.TotalEspaco}");

            double totalPower = CalculadoraPoder.CalcularTotalPower(predio);
            Console.WriteLine($"\nPoder total: {totalPower:F2}");

            PowerEvaluator.AvaliarEPublicar(totalPower);

            Console.WriteLine("\nPressione qualquer tecla para sair...");
            Console.ReadKey(); // Isso mantém o console aberto até o usuário pressionar uma tecla.

        }

        static int LerInteiro(string mensagem)
        {
            Console.Write(mensagem);
            return int.Parse(Console.ReadLine());

        }


    }
}