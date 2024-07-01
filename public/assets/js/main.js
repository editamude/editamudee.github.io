/**
* Template Name: Arsha
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate  glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

})()

/**
   * blog try
   */(function () {
    "use strict";

    // Helper functions...
    // (Tidak perlu diubah)

    /**
     * Function to save and retrieve blog posts from local storage
     */
    const getBlogPosts = () => {
      return JSON.parse(localStorage.getItem('blogPosts')) || [];
    }

    const saveBlogPosts = (posts) => {
      localStorage.setItem('blogPosts', JSON.stringify(posts));
    }

    const addBlogPost = (post) => {
      const posts = getBlogPosts();
      posts.push(post);
      saveBlogPosts(posts);
    }

    const deleteBlogPost = (index) => {
      const posts = getBlogPosts();
      posts.splice(index, 1);
      saveBlogPosts(posts);
    }

    const updateBlogPost = (index, updatedPost) => {
      const posts = getBlogPosts();
      posts[index] = updatedPost;
      saveBlogPosts(posts);
    }

    /**
     * Function to render the list of blog posts
     */
    const renderBlogPosts = () => {
      const posts = getBlogPosts();
      const blogList = document.querySelector('.blog-list'); // Menggunakan document.querySelector() untuk memilih elemen
      if (blogList) {
        blogList.innerHTML = '';
        posts.forEach((post, index) => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            
            <h3>${post.title}</h3>
            <p>${post.date}</p>
            <p>${post.content.substring(0, 50)}...</p>
            <button class="edit-post" data-index="${index}">Edit</button>
            <button class="delete-post" data-index="${index}">Delete</button>`;
          blogList.appendChild(listItem);
        });
      }
    }


    // Event listeners...

    /**
     * Event listener for submitting a new blog post
     */
    document.getElementById('blog-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const title = document.getElementById('blog-title').value;
      const date = document.getElementById('blog-date').value;
      const content = document.getElementById('blog-content').value;
      const newPost = {
        title,
        date,
        content
      };
      addBlogPost(newPost);
      renderBlogPosts();
      // Additional logic to clear the form if needed
    });

    /**
     * Event listener for deleting a blog post
     */
    document.addEventListener('click', function (e) {
      if (e.target && e.target.classList.contains('delete-post')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        deleteBlogPost(index);
        renderBlogPosts();
      }
    });


    /**
     * Event listener for editing a blog post
     */
    /**
 * Event listener for editing a blog post
 */
    on('click', '.edit-post', function (e) {
      console.log('Tombol Edit Ditekan');
      const index = parseInt(this.getAttribute('data-index'));
      const posts = getBlogPosts();
      const post = posts[index];
      console.log('Indeks Posting:', index);

      // Mengisi nilai formulir dengan informasi posting yang ingin diedit
      select('#blog-title').value = post.title;
      select('#blog-date').value = post.date;
      select('#blog-content').value = post.content;

      // Menampilkan formulir yang berisi informasi posting untuk diedit
      // Misalnya, Anda dapat menampilkan formulir dengan mengubah tampilan CSS-nya
      const blogForm = select('#blog-form');
      blogForm.style.display = 'block'; // Menampilkan formulir

      // Mengubah teks tombol "Post" menjadi "Save" untuk menyimpan perubahan
      const submitButton = blogForm.querySelector('button[type="submit"]');
      submitButton.textContent = 'Save';

      // Event listener untuk menyimpan perubahan yang dilakukan pada posting
      blogForm.removeEventListener('submit', handlePostSubmit); // Hapus listener submit sebelumnya
      blogForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Ambil nilai dari formulir yang telah diubah oleh pengguna
        const updatedTitle = select('#blog-title').value;
        const updatedDate = select('#blog-date').value;
        const updatedContent = select('#blog-content').value;

        // Update posting yang sesuai dalam array
        posts[index].title = updatedTitle;
        posts[index].date = updatedDate;
        posts[index].content = updatedContent;

        // Buat objek yang berisi informasi posting yang diperbarui
        const updatedPost = {
          title: updatedTitle,
          date: updatedDate,
          content: updatedContent
        };

        // Simpan perubahan ke local storage
        saveBlogPosts(posts);

        // Update posting yang sesuai dalam array menggunakan fungsi updateBlogPost()
        updateBlogPost(index, updatedPost);

        // Render ulang daftar posting
        renderBlogPosts();

        // Kosongkan dan sembunyikan formulir setelah perubahan disimpan
        // blogForm.reset();
        // blogForm.style.display = 'none';
        document.getElementById('blog-form').reset();
        document.getElementById('blog-form').style.display = 'none';

        // Ubah teks tombol kembali menjadi "Post" untuk menyesuaikan dengan fungsi awal
        submitButton.textContent = 'Post';

        // Tambahkan kembali event listener untuk menangani submit posting
        blogForm.addEventListener('submit', handlePostSubmit);
      });
    });

    // Initialization...
    // (Tidak perlu diubah)
  })();

  /**
   * blog try
   */

  // Function to edit a blog post
function editBlogPost(button) {
  var post = button.parentElement;
  var title = post.querySelector('h3').textContent;
  var date = post.querySelector('p:nth-of-type(1)').textContent.replace('Date: ', '');
  var content = post.querySelector('p:nth-of-type(2)').textContent;
  document.getElementById('blog-title').value = title;
  document.getElementById('blog-date').value = date;
  document.getElementById('blog-content').value = content;
  // Menyimpan ID postingan yang akan diedit
  document.getElementById('blog-form').setAttribute('data-post-id', post.id);
}

// Function to delete a blog post
function deleteBlogPost(button) {
  var post = button.parentElement;
  post.remove();
  // Additional code to handle deletion from backend/database
}

// Function to save edited blog post
document.getElementById('blog-form').addEventListener('submit', function(event) {
  event.preventDefault();
  var title = document.getElementById('blog-title').value;
  var date = document.getElementById('blog-date').value;
  var content = document.getElementById('blog-content').value;
  var postId = document.getElementById('blog-form').getAttribute('data-post-id');

  if (postId) {
    // If postId exists, update the existing post
    var postToUpdate = document.getElementById(postId);
    postToUpdate.querySelector('h3').textContent = title;
    postToUpdate.querySelector('p:nth-of-type(1)').textContent = 'Date: ' + date;
    postToUpdate.querySelector('p:nth-of-type(2)').textContent = content;
    // Additional code to update backend/database
  } else {
    // If postId does not exist, add a new post
    addBlogPost(title, date, content);
    // Additional code to add to backend/database
  }

  // Reset form fields
  document.getElementById('blog-form').reset();
  document.getElementById('blog-form').removeAttribute('data-post-id');
});
