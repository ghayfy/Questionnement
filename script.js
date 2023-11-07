// ... (le code précédent reste inchangé)

document.getElementById("coachingForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Récupérer les réponses du formulaire
    const responses = [];
    const questionContainers = document.querySelectorAll(".question-container");
    questionContainers.forEach((container, index) => {
      const question = container.querySelector("h2").textContent;
      const answer = container.querySelector('textarea').value;
      responses.push({ question, answer });
    });
  
    // Convertir les réponses en un document Word
    const wordContent = "Questionnement de CLARIFICATION de la DEMANDE\n\n";
    responses.forEach((response, index) => {
      wordContent += `${response.question}\n${response.answer}\n\n`;
    });
  
    // Utiliser mammoth.js pour convertir le document Word
    mammoth.convert({html: wordContent})
      .then(function(result) {
        // Créer un objet Blob avec le contenu Word converti
        const blob = new Blob([result.value], { type: "application/msword" });
  
        // Créer un lien de téléchargement pour le fichier Word
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "Questionnaire_Clarification_Demande.doc";
        a.click();
      })
      .catch(function(err) {
        console.error(err);
      });
  });
  
  // ... (le code précédent pour la navigation reste inchangé)
  