document.addEventListener("DOMContentLoaded", function() {
    const questionForm = document.getElementById("questionForm");
    const questionBlocks = document.querySelectorAll(".question-block");
    const resultText = document.getElementById("resultText");
    const resultsSection = document.getElementById("results");
    const downloadButton = document.getElementById("downloadButton");
    let currentBlockIndex = 0;

    function showCurrentBlock() {
        questionBlocks.forEach((block, index) => {
            if (index === currentBlockIndex) {
                block.style.display = "block";
            } else {
                block.style.display = "none";
            }
        });
        if (currentBlockIndex === questionBlocks.length - 1) {
            document.getElementById("nextButton").setAttribute("disabled", "true");
        } else {
            document.getElementById("nextButton").removeAttribute("disabled");
        }
    }

    function updateResults() {
        let result = "";
        questionBlocks.forEach((block, index) => {
            const answers = block.querySelectorAll("textarea");
            answers.forEach((answer, i) => {
                result += `Question ${index + 1}.${i + 1}: ${answer.value}\n`;
            });
        }
        resultText.textContent = result;
        downloadButton.removeAttribute("disabled");

        // Générer le fichier texte et activer le bouton de téléchargement
        downloadButton.addEventListener("click", () => {
            const textToDownload = resultText.textContent;
            const blob = new Blob([textToDownload], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "reponses.txt";
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
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
