document.getElementById('search').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const buttons = document.querySelectorAll('.input .value');

    buttons.forEach(button => {
      const text = button.innerText.toLowerCase();
      if (text.includes(searchTerm)) {
        button.classList.remove('hidden');
      } else {
        button.classList.add('hidden');
      }
    });
  });