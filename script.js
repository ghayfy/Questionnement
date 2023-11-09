document.addEventListener("DOMContentLoaded", function() {
    const questionForm = document.getElementById("questionForm");
    const questionBlocks = document.querySelectorAll(".question-block");
    const resultText = document.getElementById("resultText");
    const resultsSection = document.getElementById("results");
    let currentBlockIndex = 0;

    function showCurrentBlock() {
        questionBlocks.forEach((block, index) => {
            if (index === currentBlockIndex) {
                block.style.display = "block";
            } else {
                block.style.display = "none";
            }
        });
    }

    function updateResults() {
        let result = "";
        questionBlocks.forEach((block, index) => {
            const answers = block.querySelectorAll("textarea");
            answers.forEach((answer, i) => {
                result += `Question ${index + 1}.${i + 1}: ${answer.value}\n`;
            });
        });
        resultText.textContent = result;

        // Ajouter la gestion du téléchargement
        const downloadLink = document.getElementById("downloadLink");
        const blob = new Blob([result], { type: "text/plain" });
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "reponses.txt";
    }

    showCurrentBlock();

    document.getElementById("nextButton").addEventListener("click", () => {
        if (currentBlockIndex < questionBlocks.length - 1) {
            currentBlockIndex++;
            showCurrentBlock();
        }
    });

    document.getElementById("prevButton").addEventListener("click", () => {
        if (currentBlockIndex > 0) {
            currentBlockIndex--;
            showCurrentBlock();
        }
    });

    document.getElementById("submitButton").addEventListener("click", () => {
        if (currentBlockIndex === questionBlocks.length - 1) {
            updateResults();
            resultsSection.style.display = "block";
        }
    });
});