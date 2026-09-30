document.addEventListener('DOMContentLoaded', function () {
      
      // 1. EFEITO DE SCROLL NO HEADER
      var header = document.getElementById('header');
      window.addEventListener('scroll', function () {
        if (window.scrollY > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });

      // 2. CONTROLE DO MENU MOBILE E BOTÃO DE INFORMAÇÕES RÁPIDAS (...)
      var mobileMenuBtn = document.getElementById('mobileMenuBtn');
      var quickInfoBtn = document.getElementById('quickInfoBtn');
      var mobileDrawer = document.getElementById('mobileDrawer');
      var mobileLinks = document.querySelectorAll('.mobile-link');

      function toggleMobileMenu() {
        var isOpen = mobileDrawer.classList.toggle('open');
        mobileMenuBtn.classList.toggle('active', isOpen);
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      }

      mobileMenuBtn.addEventListener('click', toggleMobileMenu);

      if (quickInfoBtn) {
        quickInfoBtn.addEventListener('click', toggleMobileMenu);
      }

      mobileLinks.forEach(function (link) {
        link.addEventListener('click', function () {
          mobileDrawer.classList.remove('open');
          mobileMenuBtn.classList.remove('active');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
      });

      // FECHAR AO CLICAR FORA DA GAVETA
      document.addEventListener('click', function (e) {
        if (mobileDrawer.classList.contains('open') && 
            !mobileDrawer.contains(e.target) && 
            !mobileMenuBtn.contains(e.target) &&
            (!quickInfoBtn || !quickInfoBtn.contains(e.target))) {
          mobileDrawer.classList.remove('open');
          mobileMenuBtn.classList.remove('active');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // RASTREAMENTO DO LINK ATIVO NO HEADER CONFORME O SCROLL
      var navLinks = document.querySelectorAll('.header-nav-center .nav-link');
      var sections = document.querySelectorAll('section[id]');

      window.addEventListener('scroll', function () {
        var currentSection = '';
        var scrollY = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(function (section) {
          var sectionTop = section.offsetTop - 140;
          var sectionHeight = section.offsetHeight;
          if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
          }
        });

        if (currentSection) {
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
              link.classList.add('active');
            }
          });
        }
      });

      // 3. ACCORDION DAS PERGUNTAS FREQUENTES (FAQ)
      var faqItems = document.querySelectorAll('.faq-item');

      faqItems.forEach(function (item) {
        var btn = item.querySelector('.faq-question-btn');
        var panel = item.querySelector('.faq-answer-panel');

        btn.addEventListener('click', function () {
          var isActive = item.classList.contains('active');

          // FECHA OUTROS ITENS PARA MANTER UM POR VEZ
          faqItems.forEach(function (otherItem) {
            otherItem.classList.remove('active');
            var otherPanel = otherItem.querySelector('.faq-answer-panel');
            if (otherPanel) {
              otherPanel.style.maxHeight = null;
            }
          });

          if (!isActive) {
            item.classList.add('active');
            panel.style.maxHeight = panel.scrollHeight + 'px';
          } else {
            item.classList.remove('active');
            panel.style.maxHeight = null;
          }
        });
      });

      // 4. ENVIO DO FORMULÁRIO COM REDIRECIONAMENTO WHATSAPP
      var projectForm = document.getElementById('projectForm');
      if (projectForm) {
        projectForm.addEventListener('submit', function (e) {
          e.preventDefault();

          var name = document.getElementById('formName').value.trim();
          var phone = document.getElementById('formPhone').value.trim();
          var city = document.getElementById('formCity').value.trim();
          var size = document.getElementById('formSize').value;
          var notes = document.getElementById('formNotes').value.trim();

          var message = 'Olá, equipe da META Construção Rápida!\n\n';
          message += 'Gostaria de solicitar um estudo de projeto:\n';
          message += '• Nome: ' + name + '\n';
          message += '• Telefone: ' + phone + '\n';
          message += '• Região em SC: ' + city + '\n';
          message += '• Área estimada: ' + size + '\n';
          if (notes) {
            message += '• Detalhes do lote: ' + notes + '\n';
          }

          var encodedMessage = encodeURIComponent(message);
          var whatsappUrl = 'https://wa.me/554896948185?text=' + encodedMessage;

          // Abre o WhatsApp com a mensagem formatada
          window.open(whatsappUrl, '_blank');
        });
      }

    });
