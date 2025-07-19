document.addEventListener('DOMContentLoaded', function() {
    // Constantes e configurações
    const FIX_MSG = 'Baseado no poder no Neo Colosso n.8, que é de 35,05,';
    const POWER_THRESHOLDS = {
        HIGH: 31,
        MEDIUM: 20,
        LOW: 10
    };
    const POWER_MESSAGES = {
        HIGH: `${FIX_MSG} esse prédio está conforme os padrões novos do jogo.`,
        MEDIUM: `${FIX_MSG} esse prédio está caminhando para a obsolescência. Considere trocá-lo.`,
        LOW: `${FIX_MSG} esse prédio está totalmente obsoleto. Troque-o o mais rápido possível.`,
        CRITICAL: `${FIX_MSG}o valor do poder desse prédio é muito baixo. Considere trocá-lo o mais rápido possível.`
    };

    // Elementos do DOM
    const calculateBtn = document.querySelector('.calculate-btn');
    const container = document.querySelector('.container');
    const spaceXInput = document.getElementById('space-axis-X');
    const spaceYInput = document.getElementById('space-axis-Y');
    
    // Configuração dos inputs obrigatórios
    [spaceXInput, spaceYInput].forEach(input => setupRequiredInput(input));

    calculateBtn.addEventListener('click', handleCalculation);

    // Validação em tempo real
    [spaceXInput, spaceYInput].forEach(input => {
        input.addEventListener('input', () => clearValidation(input));
    });

    // Carrega o Font Awesome
    loadFontAwesome();

    // --- Funções principais ---
    function handleCalculation() {
        if (!validateRequiredFields()) return;

        const values = getAllInputValues();
        const { totalPower, totalSpace } = calculatePower(values);

        clearAllNumberInputs();
        showResult(totalPower, values, totalSpace);
    }

    function getAllInputValues() {
        return {
            redBaseAttack: getNumberValue('red-base-attack'),
            redBaseDefense: getNumberValue('red-base-defense'),
            blueBaseAttack: getNumberValue('blue-base-attack'),
            blueBaseDef: getNumberValue('blue-base-def'),
            redAttackExp: getNumberValue('red-attack-exp'),
            redDefenseExp: getNumberValue('red-defense-exp'),
            blueAttackExp: getNumberValue('blue-attack-exp'),
            blueDefenseExp: getNumberValue('blue-defense-exp'),
            redAttackCbg: getNumberValue('red-attack-cbg'),
            redDefenseCbg: getNumberValue('red-defense-cbg'),
            blueAttackCbg: getNumberValue('blue-attack-cbg'),
            blueDefenseCbg: getNumberValue('blue-defense-cbg'),
            redAttackIq: getNumberValue('red-attack-iq'),
            redDefenseIq: getNumberValue('red-defense-iq'),
            blueAttackIq: getNumberValue('blue-attack-iq'),
            blueDefenseIq: getNumberValue('blue-defense-iq'),
            spaceX: getNumberValue('space-axis-X'),
            spaceY: getNumberValue('space-axis-Y')
        };
    }

    function calculatePower(values) {
        const totalSpace = values.spaceX * values.spaceY;
        const totalPower = (
            (values.redBaseAttack + values.redBaseDefense + 
             values.blueBaseAttack + values.blueBaseDef) * 2 +
            values.redAttackExp + values.redDefenseExp +
            values.blueAttackExp + values.blueDefenseExp +
            values.redAttackCbg + values.redDefenseCbg +
            values.blueAttackCbg + values.blueDefenseCbg +
            values.redAttackIq + values.redDefenseIq +
            values.blueAttackIq + values.blueDefenseIq
        ) / (totalSpace || 1);

        return { totalPower, totalSpace };
    }

    function showResult(totalPower, values, totalSpace) {
        document.querySelector('.result-container')?.remove();
        
        const resultContainer = document.createElement('div');
        resultContainer.className = 'result-container';
        
        // Mensagem principal com valor do poder
        const powerTitle = document.createElement('h2');
        const powerValue = document.createElement('span');
        powerValue.textContent = totalPower.toFixed(2);
        
        // Define estilo baseado no valor
        const { color, message } = getPowerStatus(totalPower, values);
        powerValue.style.cssText = `font-size:1.5em; font-weight:bold; color:${color}`;
        
        powerTitle.textContent = 'O poder total desse prédio é ';
        powerTitle.appendChild(powerValue);
        resultContainer.appendChild(powerTitle);
        
        // Adiciona mensagem específica
        const statusMessage = document.createElement('p');
        statusMessage.textContent = message;
        statusMessage.style.cssText = `color:${color}; margin-top:10px; font-weight:bold`;
        resultContainer.appendChild(statusMessage);
        
        container.appendChild(resultContainer);
    }

    function getPowerStatus(totalPower, values) {
        if (totalPower > POWER_THRESHOLDS.HIGH) {
            return {
                color: '#4CAF50',
                message: POWER_MESSAGES.HIGH
            };
        } else if (totalPower >= POWER_THRESHOLDS.MEDIUM) {
            return {
                color: '#FF9800',
                message: POWER_MESSAGES.MEDIUM
            };
        } else if (totalPower >= POWER_THRESHOLDS.LOW) {
            return {
                color: '#F44336',
                message: POWER_MESSAGES.LOW
            };
        } else if (values.redBaseAttack || values.redBaseDefense || 
                  values.blueBaseAttack || values.blueBaseDef) {
            return {
                color: '#F44336',
                message: POWER_MESSAGES.CRITICAL
            };
        }
        return {
            color: '#F44336',
            message: POWER_MESSAGES.LOW
        };
    }

    // --- Funções auxiliares ---
    function setupRequiredInput(input) {
        const wrapper = document.createElement('div');
        wrapper.className = 'input-required';
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);
        
        const warning = document.createElement('span');
        warning.className = 'required-warning';
        warning.innerHTML = '<i class="fa-solid fa-triangle-exclamation required-icon"></i> Campo obrigatório';
        wrapper.appendChild(warning);
    }

    function validateRequiredFields() {
        let isValid = true;
        [spaceXInput, spaceYInput].forEach(input => {
            if (!input.value.trim()) {
                input.parentNode.classList.add('invalid');
                isValid = false;
            }
        });
        return isValid;
    }

    function clearValidation(input) {
        if (input.value.trim()) {
            input.parentNode.classList.remove('invalid');
        }
    }

    function getNumberValue(id) {
        const val = document.getElementById(id)?.value;
        return val ? parseFloat(val) : 0;
    }

    function clearAllNumberInputs() {
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.value = '';
        });
    }

    function loadFontAwesome() {
        const faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(faLink);
    }
});