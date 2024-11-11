document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("Mensagem enviada! Entraremos em contato em breve.Obrigado!"); /*Exibira uma mensagem */
      form.reset();
    });
  });