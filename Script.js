/* =========================================
   PRIME — APLICACIÓN PRINCIPAL
   Idiomas, temas, canchas, mapa y cuentas
========================================= */

"use strict";

/*
 * CONFIGURACIÓN DE FIREBASE
 *
 * Para habilitar el inicio de sesión real:
 * 1. Crea un proyecto en Firebase.
 * 2. Registra una aplicación web.
 * 3. Activa Email/Password, Google y Apple.
 * 4. Sustituye los valores siguientes por los de tu proyecto.
 *
 * Mientras los valores sean marcadores de posición,
 * el inicio de sesión real no estará habilitado.
 */

const firebaseConfig = {
    apiKey: "PEGA_AQUI_TU_API_KEY",
    authDomain: "PEGA_AQUI_TU_AUTH_DOMAIN",
    projectId: "PEGA_AQUI_TU_PROJECT_ID",
    appId: "PEGA_AQUI_TU_APP_ID"
};

let auth = null;
let currentUser = null;

const firebaseConfigured =
    firebaseConfig.apiKey !== "PEGA_AQUI_TU_API_KEY" &&
    firebaseConfig.authDomain !== "PEGA_AQUI_TU_AUTH_DOMAIN" &&
    firebaseConfig.projectId !== "PEGA_AQUI_TU_PROJECT_ID" &&
    firebaseConfig.appId !== "PEGA_AQUI_TU_APP_ID";

/* =========================================
   TRADUCCIONES
========================================= */

const translations = {
    es: {
        navHome: "Inicio",
        navCourts: "Canchas",
        navMap: "Mapa",
        navCoaches: "Entrenadores",
        navCommunity: "Comunidad",
        navBlog: "Blog",
        navContact: "Contacto",
        account: "Mi cuenta",

        heroEyebrow: "TU DEPORTE. TU COMUNIDAD. TU NIVEL.",
        heroTitle: 'LLEVA TU JUEGO<br><span class="highlight">AL SIGUIENTE NIVEL.</span>',
        heroText: "Encuentra canchas, conecta con entrenadores y forma parte de una comunidad que vive el deporte.",
        findCourt: "Encuentra una cancha",
        findCoach: "Conoce a los entrenadores",
        statOne: "Encuentra",
        statTwo: "Entrena",
        statThree: "Supérate",

        benefitsEyebrow: "HECHO PARA DEPORTISTAS",
        benefitsTitle: "TODO LO QUE NECESITAS<br>PARA AVANZAR",
        benefitsText: "Encuentra espacios para jugar, personas que te ayuden a mejorar y una comunidad que te motive.",
        featureCourtTitle: "Canchas cerca de ti",
        featureCourtText: "Descubre espacios deportivos y consulta su ubicación.",
        exploreMap: "Explorar mapa",
        featureCoachTitle: "Entrenadores",
        featureCoachText: "Encuentra profesionales para desarrollar tus habilidades.",
        meetCoaches: "Ver entrenadores",
        featureCommunityTitle: "Comunidad deportiva",
        featureCommunityText: "Comparte experiencias, ideas y objetivos deportivos.",
        joinCommunity: "Conocer comunidad",

        courtsEyebrow: "ENCUENTRA TU ESPACIO",
        courtsTitle: "CANCHAS DESTACADAS",
        courtsText: "Explora algunas ubicaciones de ejemplo en Panamá.",
        seeMap: "Ver mapa",
        searchLabel: "Buscar",
        courtSearchPlaceholder: "Buscar cancha o ubicación",
        sportLabel: "Deporte",
        allSports: "Todos los deportes",
        basketball: "Baloncesto",
        football: "Fútbol",
        tennis: "Tenis",
        volleyball: "Voleibol",
        demoNote: "Nota: estas canchas son ejemplos de demostración. Verifica la disponibilidad directamente con el recinto.",
        bookCourt: "Consultar cancha",
        viewLocation: "Ver ubicación",
        noCourts: "No se encontraron canchas para esta búsqueda.",

        mapEyebrow: "TU DEPORTE, MÁS CERCA",
        mapTitle: "ENCUENTRA TU PRÓXIMA CANCHA.",
        mapText: "Explora ubicaciones de ejemplo y abre el mapa para consultar cómo llegar.",
        mapLegend: "Canchas de ejemplo",
        browseCourts: "Explorar canchas",

        coachesEyebrow: "MEJORA CADA DÍA",
        coachesTitle: "ENTRENA CON PROPÓSITO",
        coachesText: "Explora perfiles de ejemplo y descubre el tipo de entrenamiento que puede ayudarte a progresar.",
        coachBasketball: "Entrenamiento de baloncesto",
        coachFootball: "Entrenamiento de fútbol",
        coachFitness: "Preparación física",
        coachDescription: "Perfil de demostración. Contacta con el profesional para consultar sus servicios.",
        contactCoach: "Consultar entrenador",

        communityEyebrow: "MÁS QUE UN JUEGO",
        communityTitle: "EL DEPORTE NOS CONECTA.",
        communityText: "PRIME busca conectar deportistas, fomentar hábitos positivos y crear oportunidades para crecer juntos.",
        communityPoint1: "Descubre nuevas oportunidades deportivas.",
        communityPoint2: "Comparte metas y experiencias.",
        communityPoint3: "Encuentra inspiración para seguir mejorando.",
        joinPrime: "Únete a PRIME",

        blogEyebrow: "IDEAS PARA TU PROGRESO",
        blogTitle: "PRIME INSIGHTS",
        blogText: "Consejos para entrenar, trabajar en equipo y disfrutar del deporte.",
        blogCategoryTraining: "ENTRENAMIENTO",
        blogOneTitle: "Construye hábitos de entrenamiento",
        blogOneText: "La constancia y los objetivos realistas te ayudan a mejorar paso a paso.",
        blogCategoryTeam: "TRABAJO EN EQUIPO",
        blogTwoTitle: "Crecer también significa colaborar",
        blogTwoText: "La comunicación y el respeto son parte fundamental de cualquier equipo.",
        blogCategoryWellness: "BIENESTAR",
        blogThreeTitle: "Entrena de forma equilibrada",
        blogThreeText: "Descansar, hidratarse y escuchar al cuerpo también forman parte del progreso.",

        contactEyebrow: "HABLEMOS",
        contactTitle: "¿TIENES UNA IDEA PARA PRIME?",
        contactText: "Envíanos un mensaje con tus dudas, sugerencias o propuestas.",
        contactEmailHint: "Completa el formulario para preparar tu mensaje.",
        nameLabel: "Nombre",
        namePlaceholder: "Tu nombre",
        emailLabel: "Correo electrónico",
        emailPlaceholder: "tu@correo.com",
        messageLabel: "Mensaje",
        messagePlaceholder: "Escribe tu mensaje...",
        sendMessage: "Preparar mensaje",
        contactFormNote: "Este formulario abre tu aplicación de correo; no envía mensajes a un servidor.",

        accountEyebrow: "TU EXPERIENCIA PRIME",
        accountTitle: "ENTRA EN JUEGO.",
        accountText: "Crea una cuenta o inicia sesión para acceder a las funciones reservadas para usuarios.",
        authSetupNote: "El acceso real necesita configuración de Firebase.",
        loginTab: "Iniciar sesión",
        registerTab: "Crear cuenta",
        passwordLabel: "Contraseña",
        loginButton: "Iniciar sesión",
        registerButton: "Crear cuenta",
        orContinue: "O continúa con",
        authDisclaimer: "Google y Apple requieren habilitar y configurar esos proveedores en Firebase.",

        profileEyebrow: "TU CUENTA",
        profileTitle: "MI PERFIL PRIME",
        logoutButton: "Cerrar sesión",
        ctaEyebrow: "TU PRÓXIMO NIVEL EMPIEZA HOY",
        ctaTitle: "¿LISTO PARA JUGAR?",
        explorePrime: "Explorar PRIME",
        footerText: "Conectamos deportistas con espacios, entrenadores y oportunidades.",
        footerExplore: "Explorar",
        footerHelp: "Ayuda",
        rights: "Todos los derechos reservados.",
        backTop: "Volver arriba ↑",

        darkMode: "Activar modo claro",
        lightMode: "Activar modo oscuro",
        loginRequired: "Inicia sesión para continuar.",
        firebaseMissing: "Primero configura Firebase para habilitar el acceso real.",
        loginSuccess: "Has iniciado sesión correctamente.",
        registerSuccess: "Tu cuenta ha sido creada.",
        logoutSuccess: "Has cerrado sesión.",
        authError: "No se pudo completar el acceso. Revisa la configuración y tus datos.",
        contactPrepared: "Abriendo tu aplicación de correo.",
        emailSubject: "Mensaje desde PRIME",
        accountAlreadyExists: "Ya tienes una sesión iniciada.",
        mapUnavailable: "El mapa no pudo cargarse. Comprueba tu conexión a internet."
    },

    en: {
        navHome: "Home",
        navCourts: "Courts",
        navMap: "Map",
        navCoaches: "Coaches",
        navCommunity: "Community",
        navBlog: "Blog",
        navContact: "Contact",
        account: "My account",

        heroEyebrow: "YOUR SPORT. YOUR COMMUNITY. YOUR LEVEL.",
        heroTitle: 'TAKE YOUR GAME<br><span class="highlight">TO THE NEXT LEVEL.</span>',
        heroText: "Find courts, connect with coaches and become part of a community that lives for sports.",
        findCourt: "Find a court",
        findCoach: "Meet the coaches",
        statOne: "Discover",
        statTwo: "Train",
        statThree: "Improve",

        benefitsEyebrow: "BUILT FOR ATHLETES",
        benefitsTitle: "EVERYTHING YOU NEED<br>TO MOVE FORWARD",
        benefitsText: "Find places to play, people who help you improve and a community that motivates you.",
        featureCourtTitle: "Courts near you",
        featureCourtText: "Discover sports facilities and check their locations.",
        exploreMap: "Explore map",
        featureCoachTitle: "Coaches",
        featureCoachText: "Find professionals to help develop your skills.",
        meetCoaches: "View coaches",
        featureCommunityTitle: "Sports community",
        featureCommunityText: "Share experiences, ideas and athletic goals.",
        joinCommunity: "Discover community",

        courtsEyebrow: "FIND YOUR SPACE",
        courtsTitle: "FEATURED COURTS",
        courtsText: "Explore sample locations in Panama.",
        seeMap: "View map",
        searchLabel: "Search",
        courtSearchPlaceholder: "Search court or location",
        sportLabel: "Sport",
        allSports: "All sports",
        basketball: "Basketball",
        football: "Football",
        tennis: "Tennis",
        volleyball: "Volleyball",
        demoNote: "Note: these courts are demonstration examples. Check availability directly with the venue.",
        bookCourt: "Check court",
        viewLocation: "View location",
        noCourts: "No courts were found for this search.",

        mapEyebrow: "YOUR SPORT, CLOSER",
        mapTitle: "FIND YOUR NEXT COURT.",
        mapText: "Explore sample locations and open the map to check directions.",
        mapLegend: "Sample courts",
        browseCourts: "Browse courts",

        coachesEyebrow: "IMPROVE EVERY DAY",
        coachesTitle: "TRAIN WITH PURPOSE",
        coachesText: "Explore sample profiles and discover training that can help you progress.",
        coachBasketball: "Basketball training",
        coachFootball: "Football training",
        coachFitness: "Physical conditioning",
        coachDescription: "Demo profile. Contact the professional to ask about their services.",
        contactCoach: "Contact coach",

        communityEyebrow: "MORE THAN A GAME",
        communityTitle: "SPORT BRINGS US TOGETHER.",
        communityText: "PRIME aims to connect athletes, encourage positive habits and create opportunities to grow together.",
        communityPoint1: "Discover new sports opportunities.",
        communityPoint2: "Share goals and experiences.",
        communityPoint3: "Find inspiration to keep improving.",
        joinPrime: "Join PRIME",

        blogEyebrow: "IDEAS FOR YOUR PROGRESS",
        blogTitle: "PRIME INSIGHTS",
        blogText: "Tips for training, teamwork and enjoying sports.",
        blogCategoryTraining: "TRAINING",
        blogOneTitle: "Build training habits",
        blogOneText: "Consistency and realistic goals help you improve step by step.",
        blogCategoryTeam: "TEAMWORK",
        blogTwoTitle: "Growing also means collaborating",
        blogTwoText: "Communication and respect are essential to every team.",
        blogCategoryWellness: "WELLNESS",
        blogThreeTitle: "Train with balance",
        blogThreeText: "Rest, hydration and listening to your body are part of progress.",

        contactEyebrow: "LET'S TALK",
        contactTitle: "HAVE AN IDEA FOR PRIME?",
        contactText: "Send us a message with your questions, suggestions or proposals.",
        contactEmailHint: "Fill out the form to prepare your message.",
        nameLabel: "Name",
        namePlaceholder: "Your name",
        emailLabel: "Email address",
        emailPlaceholder: "you@email.com",
        messageLabel: "Message",
        messagePlaceholder: "Write your message...",
        sendMessage: "Prepare message",
        contactFormNote: "This form opens your email application; it does not send messages to a server.",

        accountEyebrow: "YOUR PRIME EXPERIENCE",
        accountTitle: "GET IN THE GAME.",
        accountText: "Create an account or sign in to access member features.",
        authSetupNote: "Real sign-in requires Firebase configuration.",
        loginTab: "Sign in",
        registerTab: "Create account",
        passwordLabel: "Password",
        loginButton: "Sign in",
        registerButton: "Create account",
        orContinue: "Or continue with",
        authDisclaimer: "Google and Apple require enabling and configuring those providers in Firebase.",

        profileEyebrow: "YOUR ACCOUNT",
        profileTitle: "MY PRIME PROFILE",
        logoutButton: "Sign out",
        ctaEyebrow: "YOUR NEXT LEVEL STARTS TODAY",
        ctaTitle: "READY TO PLAY?",
        explorePrime: "Explore PRIME",
        footerText: "We connect athletes with facilities, coaches and opportunities.",
        footerExplore: "Explore",
        footerHelp: "Help",
        rights: "All rights reserved.",
        backTop: "Back to top ↑",

        darkMode: "Enable light mode",
        lightMode: "Enable dark mode",
        loginRequired: "Please sign in to continue.",
        firebaseMissing: "Configure Firebase first to enable real sign-in.",
        loginSuccess: "You have signed in successfully.",
        registerSuccess: "Your account has been created.",
        logoutSuccess: "You have signed out.",
        authError: "Could not complete sign-in. Check your configuration and details.",
        contactPrepared: "Opening your email application.",
        emailSubject: "Message from PRIME",
        accountAlreadyExists: "You are already signed in.",
        mapUnavailable: "The map could not load. Check your internet connection."
    },

    fr: {
        navHome: "Accueil",
        navCourts: "Terrains",
        navMap: "Carte",
        navCoaches: "Entraîneurs",
        navCommunity: "Communauté",
        navBlog: "Blog",
        navContact: "Contact",
        account: "Mon compte",

        heroEyebrow: "VOTRE SPORT. VOTRE COMMUNAUTÉ. VOTRE NIVEAU.",
        heroTitle: 'FAITES ÉVOLUER VOTRE JEU<br><span class="highlight">AU NIVEAU SUPÉRIEUR.</span>',
        heroText: "Trouvez des terrains, contactez des entraîneurs et rejoignez une communauté passionnée de sport.",
        findCourt: "Trouver un terrain",
        findCoach: "Découvrir les entraîneurs",
        statOne: "Découvrir",
        statTwo: "S'entraîner",
        statThree: "Progresser",

        benefitsEyebrow: "CONÇU POUR LES SPORTIFS",
        benefitsTitle: "TOUT CE QU'IL VOUS FAUT<br>POUR AVANCER",
        benefitsText: "Trouvez des lieux pour jouer, des personnes pour progresser et une communauté motivante.",
        featureCourtTitle: "Terrains près de vous",
        featureCourtText: "Découvrez des installations sportives et leur emplacement.",
        exploreMap: "Explorer la carte",
        featureCoachTitle: "Entraîneurs",
        featureCoachText: "Trouvez des professionnels pour développer vos compétences.",
        meetCoaches: "Voir les entraîneurs",
        featureCommunityTitle: "Communauté sportive",
        featureCommunityText: "Partagez vos expériences, idées et objectifs sportifs.",
        joinCommunity: "Découvrir la communauté",

        courtsEyebrow: "TROUVEZ VOTRE ESPACE",
        courtsTitle: "TERRAINS À DÉCOUVRIR",
        courtsText: "Explorez quelques emplacements fictifs au Panama.",
        seeMap: "Voir la carte",
        searchLabel: "Rechercher",
        courtSearchPlaceholder: "Rechercher un terrain ou un lieu",
        sportLabel: "Sport",
        allSports: "Tous les sports",
        basketball: "Basket-ball",
        football: "Football",
        tennis: "Tennis",
        volleyball: "Volley-ball",
        demoNote: "Remarque : ces terrains sont des exemples de démonstration. Vérifiez la disponibilité auprès du site.",
        bookCourt: "Consulter le terrain",
        viewLocation: "Voir l'emplacement",
        noCourts: "Aucun terrain trouvé pour cette recherche.",

        mapEyebrow: "VOTRE SPORT, PLUS PROCHE",
        mapTitle: "TROUVEZ VOTRE PROCHAIN TERRAIN.",
        mapText: "Explorez des emplacements fictifs et ouvrez la carte pour consulter l'itinéraire.",
        mapLegend: "Terrains de démonstration",
        browseCourts: "Explorer les terrains",

        coachesEyebrow: "PROGRESSEZ CHAQUE JOUR",
        coachesTitle: "ENTRAÎNEZ-VOUS AVEC UN OBJECTIF",
        coachesText: "Découvrez des profils de démonstration et des types d'entraînement.",
        coachBasketball: "Entraînement de basket-ball",
        coachFootball: "Entraînement de football",
        coachFitness: "Préparation physique",
        coachDescription: "Profil de démonstration. Contactez le professionnel pour connaître ses services.",
        contactCoach: "Contacter l'entraîneur",

        communityEyebrow: "PLUS QU'UN JEU",
        communityTitle: "LE SPORT NOUS RASSEMBLE.",
        communityText: "PRIME souhaite connecter les sportifs, encourager de bonnes habitudes et créer des occasions de progresser ensemble.",
        communityPoint1: "Découvrez de nouvelles possibilités sportives.",
        communityPoint2: "Partagez vos objectifs et expériences.",
        communityPoint3: "Trouvez l'inspiration pour continuer à progresser.",
        joinPrime: "Rejoindre PRIME",

        blogEyebrow: "DES IDÉES POUR PROGRESSER",
        blogTitle: "PRIME INSIGHTS",
        blogText: "Des conseils pour l'entraînement, l'esprit d'équipe et le plaisir du sport.",
        blogCategoryTraining: "ENTRAÎNEMENT",
        blogOneTitle: "Créez des habitudes d'entraînement",
        blogOneText: "La régularité et des objectifs réalistes permettent de progresser étape par étape.",
        blogCategoryTeam: "ESPRIT D'ÉQUIPE",
        blogTwoTitle: "Progresser, c'est aussi collaborer",
        blogTwoText: "La communication et le respect sont essentiels à toute équipe.",
        blogCategoryWellness: "BIEN-ÊTRE",
        blogThreeTitle: "Entraînez-vous avec équilibre",
        blogThreeText: "Le repos, l'hydratation et l'écoute de son corps font aussi partie des progrès.",

        contactEyebrow: "PARLONS-EN",
        contactTitle: "UNE IDÉE POUR PRIME ?",
        contactText: "Envoyez-nous vos questions, suggestions ou propositions.",
        contactEmailHint: "Remplissez le formulaire pour préparer votre message.",
        nameLabel: "Nom",
        namePlaceholder: "Votre nom",
        emailLabel: "Adresse e-mail",
        emailPlaceholder: "vous@exemple.com",
        messageLabel: "Message",
        messagePlaceholder: "Écrivez votre message...",
        sendMessage: "Préparer le message",
        contactFormNote: "Ce formulaire ouvre votre application de messagerie ; il n'envoie pas de données à un serveur.",

        accountEyebrow: "VOTRE EXPÉRIENCE PRIME",
        accountTitle: "ENTREZ DANS LE JEU.",
        accountText: "Créez un compte ou connectez-vous pour accéder aux fonctions réservées aux membres.",
        authSetupNote: "La connexion réelle nécessite une configuration Firebase.",
        loginTab: "Connexion",
        registerTab: "Créer un compte",
        passwordLabel: "Mot de passe",
        loginButton: "Se connecter",
        registerButton: "Créer un compte",
        orContinue: "Ou continuer avec",
        authDisclaimer: "Google et Apple doivent être activés et configurés dans Firebase.",

        profileEyebrow: "VOTRE COMPTE",
        profileTitle: "MON PROFIL PRIME",
        logoutButton: "Se déconnecter",
        ctaEyebrow: "VOTRE PROCHAIN NIVEAU COMMENCE AUJOURD'HUI",
        ctaTitle: "PRÊT À JOUER ?",
        explorePrime: "Explorer PRIME",
        footerText: "Nous connectons les sportifs aux installations, entraîneurs et opportunités.",
        footerExplore: "Explorer",
        footerHelp: "Aide",
        rights: "Tous droits réservés.",
        backTop: "Retour en haut ↑",

        darkMode: "Activer le mode clair",
        lightMode: "Activer le mode sombre",
        loginRequired: "Connectez-vous pour continuer.",
        firebaseMissing: "Configurez d'abord Firebase pour activer la connexion réelle.",
        loginSuccess: "Connexion réussie.",
        registerSuccess: "Votre compte a été créé.",
        logoutSuccess: "Vous êtes déconnecté.",
        authError: "La connexion a échoué. Vérifiez la configuration et vos informations.",
        contactPrepared: "Ouverture de votre application de messagerie.",
        emailSubject: "Message depuis PRIME",
        accountAlreadyExists: "Vous êtes déjà connecté.",
        mapUnavailable: "La carte n'a pas pu se charger. Vérifiez votre connexion internet."
    },

    pt: {
        navHome: "Início",
        navCourts: "Quadras",
        navMap: "Mapa",
        navCoaches: "Treinadores",
        navCommunity: "Comunidade",
        navBlog: "Blog",
        navContact: "Contato",
        account: "Minha conta",

        heroEyebrow: "SEU ESPORTE. SUA COMUNIDADE. SEU NÍVEL.",
        heroTitle: 'LEVE SEU JOGO<br><span class="highlight">PARA O PRÓXIMO NÍVEL.</span>',
        heroText: "Encontre quadras, conecte-se com treinadores e faça parte de uma comunidade que vive o esporte.",
        findCourt: "Encontrar uma quadra",
        findCoach: "Conhecer os treinadores",
        statOne: "Descubra",
        statTwo: "Treine",
        statThree: "Supere-se",

        benefitsEyebrow: "FEITO PARA ESPORTISTAS",
        benefitsTitle: "TUDO O QUE VOCÊ PRECISA<br>PARA AVANÇAR",
        benefitsText: "Encontre lugares para jogar, pessoas que ajudem você a melhorar e uma comunidade motivadora.",
        featureCourtTitle: "Quadras perto de você",
        featureCourtText: "Descubra espaços esportivos e consulte sua localização.",
        exploreMap: "Explorar mapa",
        featureCoachTitle: "Treinadores",
        featureCoachText: "Encontre profissionais para desenvolver suas habilidades.",
        meetCoaches: "Ver treinadores",
        featureCommunityTitle: "Comunidade esportiva",
        featureCommunityText: "Compartilhe experiências, ideias e objetivos esportivos.",
        joinCommunity: "Conhecer comunidade",

        courtsEyebrow: "ENCONTRE SEU ESPAÇO",
        courtsTitle: "QUADRAS EM DESTAQUE",
        courtsText: "Explore alguns locais de exemplo no Panamá.",
        seeMap: "Ver mapa",
        searchLabel: "Buscar",
        courtSearchPlaceholder: "Buscar quadra ou localização",
        sportLabel: "Esporte",
        allSports: "Todos os esportes",
        basketball: "Basquete",
        football: "Futebol",
        tennis: "Tênis",
        volleyball: "Vôlei",
        demoNote: "Nota: estas quadras são exemplos de demonstração. Verifique a disponibilidade diretamente com o local.",
        bookCourt: "Consultar quadra",
        viewLocation: "Ver localização",
        noCourts: "Nenhuma quadra foi encontrada para esta busca.",

        mapEyebrow: "SEU ESPORTE, MAIS PERTO",
        mapTitle: "ENCONTRE SUA PRÓXIMA QUADRA.",
        mapText: "Explore locais de exemplo e abra o mapa para consultar como chegar.",
        mapLegend: "Quadras de exemplo",
        browseCourts: "Explorar quadras",

        coachesEyebrow: "MELHORE TODOS OS DIAS",
        coachesTitle: "TREINE COM OBJETIVO",
        coachesText: "Explore perfis de exemplo e descubra tipos de treinamento que podem ajudar você a progredir.",
        coachBasketball: "Treinamento de basquete",
        coachFootball: "Treinamento de futebol",
        coachFitness: "Preparação física",
        coachDescription: "Perfil de demonstração. Entre em contato com o profissional para consultar seus serviços.",
        contactCoach: "Consultar treinador",

        communityEyebrow: "MAIS QUE UM JOGO",
        communityTitle: "O ESPORTE NOS CONECTA.",
        communityText: "A PRIME busca conectar esportistas, incentivar hábitos positivos e criar oportunidades para crescer juntos.",
        communityPoint1: "Descubra novas oportunidades esportivas.",
        communityPoint2: "Compartilhe objetivos e experiências.",
        communityPoint3: "Encontre inspiração para continuar melhorando.",
        joinPrime: "Entre para a PRIME",

        blogEyebrow: "IDEIAS PARA SEU PROGRESSO",
        blogTitle: "PRIME INSIGHTS",
        blogText: "Dicas para treinar, trabalhar em equipe e aproveitar o esporte.",
        blogCategoryTraining: "TREINAMENTO",
        blogOneTitle: "Crie hábitos de treinamento",
        blogOneText: "A consistência e os objetivos realistas ajudam você a melhorar passo a passo.",
        blogCategoryTeam: "TRABALHO EM EQUIPE",
        blogTwoTitle: "Crescer também significa colaborar",
        blogTwoText: "A comunicação e o respeito são fundamentais em qualquer equipe.",
        blogCategoryWellness: "BEM-ESTAR",
        blogThreeTitle: "Treine com equilíbrio",
        blogThreeText: "Descansar, hidratar-se e ouvir o corpo também fazem parte do progresso.",

        contactEyebrow: "VAMOS CONVERSAR",
        contactTitle: "TEM UMA IDEIA PARA A PRIME?",
        contactText: "Envie uma mensagem com suas dúvidas, sugestões ou propostas.",
        contactEmailHint: "Preencha o formulário para preparar sua mensagem.",
        nameLabel: "Nome",
        namePlaceholder: "Seu nome",
        emailLabel: "E-mail",
        emailPlaceholder: "voce@exemplo.com",
        messageLabel: "Mensagem",
        messagePlaceholder: "Escreva sua mensagem...",
        sendMessage: "Preparar mensagem",
        contactFormNote: "Este formulário abre seu aplicativo de e-mail; ele não envia mensagens para um servidor.",

        accountEyebrow: "SUA EXPERIÊNCIA PRIME",
        accountTitle: "ENTRE NO JOGO.",
        accountText: "Crie uma conta ou entre para acessar os recursos reservados aos usuários.",
        authSetupNote: "O acesso real exige configuração do Firebase.",
        loginTab: "Entrar",
        registerTab: "Criar conta",
        passwordLabel: "Senha",
        loginButton: "Entrar",
        registerButton: "Criar conta",
        orContinue: "Ou continue com",
        authDisclaimer: "Google e Apple precisam ser habilitados e configurados no Firebase.",

        profileEyebrow: "SUA CONTA",
        profileTitle: "MEU PERFIL PRIME",
        logoutButton: "Sair",
        ctaEyebrow: "SEU PRÓXIMO NÍVEL COMEÇA HOJE",
        ctaTitle: "PRONTO PARA JOGAR?",
        explorePrime: "Explorar PRIME",
        footerText: "Conectamos esportistas a espaços, treinadores e oportunidades.",
        footerExplore: "Explorar",
        footerHelp: "Ajuda",
        rights: "Todos os direitos reservados.",
        backTop: "Voltar ao topo ↑",

        darkMode: "Ativar modo claro",
        lightMode: "Ativar modo escuro",
        loginRequired: "Entre na sua conta para continuar.",
        firebaseMissing: "Configure o Firebase primeiro para habilitar o acesso real.",
        loginSuccess: "Login realizado com sucesso.",
        registerSuccess: "Sua conta foi criada.",
        logoutSuccess: "Você saiu da sua conta.",
        authError: "Não foi possível concluir o acesso. Verifique a configuração e seus dados.",
        contactPrepared: "Abrindo seu aplicativo de e-mail.",
        emailSubject: "Mensagem da PRIME",
        accountAlreadyExists: "Você já está conectado.",
        mapUnavailable: "O mapa não pôde ser carregado. Verifique sua conexão com a internet."
    }
};

let currentLanguage = localStorage.getItem("prime-language") || "es";
let currentTheme = localStorage.getItem("prime-theme") || "dark";

if (!translations[currentLanguage]) currentLanguage = "es";
if (!["dark", "light"].includes(currentTheme)) currentTheme = "dark";

function t(key) {
    return translations[currentLanguage]?.[key] ??
           translations.es[key] ??
           key;
}

function applyLanguage(language) {
    if (!translations[language]) return;

    currentLanguage = language;
    localStorage.setItem("prime-language", language);
    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;
        const value = t(key);

        // Se permiten saltos de línea y el resaltado controlado del título.
        element.innerHTML = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
        element.placeholder = t(element.dataset.i18nPlaceholder);
    });

    const languageSelect = document.getElementById("language-select");
    if (languageSelect) languageSelect.value = language;

    updateThemeButton();
    renderCourts();
    renderCoaches();
    updateAccountLink();
    updateProfile();

    if (mapInstance) {
        updateMapMarkers();
    }
}

/* =========================================
   TEMA CLARO / OSCURO
========================================= */

function applyTheme(theme) {
    currentTheme = theme === "light" ? "light" : "dark";

    document.documentElement.dataset.theme = currentTheme;
    document.documentElement.style.colorScheme = currentTheme;
    localStorage.setItem("prime-theme", currentTheme);

    updateThemeButton();
}

function updateThemeButton() {
    const button = document.getElementById("theme-toggle");
    if (!button) return;

    const isDark = currentTheme === "dark";

    button.innerHTML = isDark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

    button.title = isDark ? t("darkMode") : t("lightMode");
    button.setAttribute("aria-label", button.title);
}

/* =========================================
   MENÚ RESPONSIVE
========================================= */

function initializeMenu() {
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav-menu");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("open");

        toggle.setAttribute("aria-expanded", String(open));
        toggle.innerHTML = open
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

function initializeActiveLinks() {
    const links = document.querySelectorAll(".nav-link");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            links.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${entry.target.id}`
                );
            });
        });
    }, { rootMargin: "-25% 0px -65% 0px" });

    document.querySelectorAll("main section[id]").forEach(section => {
        observer.observe(section);
    });
}

/* =========================================
   CANCHAS DE DEMOSTRACIÓN
========================================= */

const courts = [
    {
        id: 1,
        name: "Cancha Central",
        location: "Ciudad de Panamá",
        sport: "basketball",
        price: 15,
        icon: "fa-basketball",
        lat: 8.9824,
        lng: -79.5199
    },
    {
        id: 2,
        name: "Complejo Deportivo",
        location: "San Francisco, Panamá",
        sport: "football",
        price: 25,
        icon: "fa-futbol",
        lat: 8.9904,
        lng: -79.5057
    },
    {
        id: 3,
        name: "Club de Tenis",
        location: "Costa del Este, Panamá",
        sport: "tennis",
        price: 20,
        icon: "fa-table-tennis-paddle-ball",
        lat: 9.0058,
        lng: -79.4642
    },
    {
        id: 4,
        name: "Cancha Metropolitana",
        location: "Parque Omar, Panamá",
        sport: "basketball",
        price: 12,
        icon: "fa-basketball",
        lat: 8.9936,
        lng: -79.5033
    },
    {
        id: 5,
        name: "Campo de Fútbol",
        location: "La Chorrera, Panamá Oeste",
        sport: "football",
        price: 20,
        icon: "fa-futbol",
        lat: 8.8803,
        lng: -79.7833
    },
    {
        id: 6,
        name: "Cancha Multiuso",
        location: "Arraiján, Panamá Oeste",
        sport: "volleyball",
        price: 18,
        icon: "fa-volleyball",
        lat: 8.9495,
        lng: -79.6601
    }
];

function sportLabel(sport) {
    const keys = {
        basketball: "basketball",
        football: "football",
        tennis: "tennis",
        volleyball: "volleyball"
    };

    return t(keys[sport] || "allSports");
}

function renderCourts() {
    const grid = document.getElementById("court-grid");
    if (!grid) return;

    const search = (
        document.getElementById("court-search")?.value || ""
    ).trim().toLowerCase();

    const selectedSport =
        document.getElementById("sport-filter")?.value || "all";

    const filtered = courts.filter(court => {
        const matchesSearch =
            court.name.toLowerCase().includes(search) ||
            court.location.toLowerCase().includes(search) ||
            sportLabel(court.sport).toLowerCase().includes(search);

        const matchesSport =
            selectedSport === "all" || court.sport === selectedSport;

        return matchesSearch && matchesSport;
    });

    if (!filtered.length) {
        grid.innerHTML = `<p>${t("noCourts")}</p>`;
        return;
    }

    grid.innerHTML = filtered.map(court => `
        <article class="court-card">
            <div class="court-visual">
                <span class="court-sport">${escapeHTML(sportLabel(court.sport))}</span>
                <i class="fa-solid ${court.icon}" aria-hidden="true"></i>
            </div>

            <div class="court-content">
                <h3>${escapeHTML(court.name)}</h3>

                <div class="court-location">
                    <i class="fa-solid fa-location-dot"></i>
                    <span>${escapeHTML(court.location)}</span>
                </div>

                <div class="court-bottom">
                    <span class="court-price">
                        $${court.price}
                        <small>/ ${currentLanguage === "en" ? "hour (example)" : currentLanguage === "fr" ? "heure (exemple)" : currentLanguage === "pt" ? "hora (exemplo)" : "hora (ejemplo)"}</small>
                    </span>

                    <button class="btn btn-primary court-action"
                            type="button" data-court-id="${court.id}">
                        ${t("viewLocation")}
                    </button>
                </div>
            </div>
        </article>
    `).join("");

    grid.querySelectorAll(".court-action").forEach(button => {
        button.addEventListener("click", () => {
            const court = courts.find(item =>
                item.id === Number(button.dataset.courtId)
            );

            if (!court) return;

            if (mapInstance) {
                mapInstance.setView([court.lat, court.lng], 15);
                const marker = mapMarkers.find(item => item.courtId === court.id);
                if (marker) marker.marker.openPopup();
            }

            document.getElementById("mapa")?.scrollIntoView({
                behavior: "smooth"
            });
        });
    });
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

/* =========================================
   MAPA CON LEAFLET
========================================= */

let mapInstance = null;
let mapMarkers = [];

function initializeMap() {
    const mapElement = document.getElementById("prime-map");

    if (!mapElement || typeof L === "undefined") {
        showToast(t("mapUnavailable"));
        return;
    }

    mapInstance = L.map(mapElement).setView([8.9824, -79.5199], 11);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
        maxZoom: 19
    }).addTo(mapInstance);

    updateMapMarkers();
}

function updateMapMarkers() {
    if (!mapInstance) return;

    mapMarkers.forEach(item => mapInstance.removeLayer(item.marker));
    mapMarkers = [];

    courts.forEach(court => {
        const marker = L.marker([court.lat, court.lng]).addTo(mapInstance);

        marker.bindPopup(`
            <strong>${escapeHTML(court.name)}</strong><br>
            ${escapeHTML(court.location)}<br>
            ${escapeHTML(sportLabel(court.sport))}
        `);

        mapMarkers.push({ courtId: court.id, marker });
    });
}

/* =========================================
   ENTRENADORES DE DEMOSTRACIÓN
========================================= */

const coaches = [
    {
        name: "Alex Rodríguez",
        specialtyKey: "coachBasketball",
        icon: "fa-basketball"
    },
    {
        name: "Daniel Martínez",
        specialtyKey: "coachFootball",
        icon: "fa-futbol"
    },
    {
        name: "Sofía Herrera",
        specialtyKey: "coachFitness",
        icon: "fa-dumbbell"
    }
];

function renderCoaches() {
    const grid = document.getElementById("coach-grid");
    if (!grid) return;

    grid.innerHTML = coaches.map((coach, index) => `
        <article class="coach-card">
            <div class="coach-visual">
                <i class="fa-solid ${coach.icon}" aria-hidden="true"></i>
            </div>
            <div class="coach-content">
                <h3>${escapeHTML(coach.name)}</h3>
                <div class="coach-specialty">${t(coach.specialtyKey)}</div>
                <p>${t("coachDescription")}</p>
                <button type="button" class="btn btn-primary coach-contact"
                        data-coach-index="${index}">
                    ${t("contactCoach")}
                </button>
            </div>
        </article>
    `).join("");

    grid.querySelectorAll(".coach-contact").forEach(button => {
        button.addEventListener("click", () => {
            if (!isLoggedIn()) {
                showToast(t("loginRequired"));
                document.getElementById("acceso")?.scrollIntoView({
                    behavior: "smooth"
                });
                return;
            }

            showToast(t("contactCoach") + ": " +
                coaches[Number(button.dataset.coachIndex)].name);
        });
    });
}

/* =========================================
   CUENTAS Y AUTENTICACIÓN
========================================= */

function isLoggedIn() {
    return Boolean(currentUser);
}

function updateAccountLink() {
    const link = document.getElementById("account-link");
    if (!link) return;

    if (currentUser) {
        link.textContent = t("profileTitle");
        link.href = "#perfil";
    } else {
        link.textContent = t("account");
        link.href = "#acceso";
    }
}

function updateProfile() {
    const profileMessage = document.getElementById("profile-message");
    const profileSection = document.getElementById("perfil");

    if (!profileMessage || !profileSection) return;

    if (currentUser) {
        profileSection.hidden = false;
        profileMessage.textContent =
            currentUser.displayName ||
            currentUser.email ||
            "PRIME";
    } else {
        profileSection.hidden = true;
    }
}

function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timeout);

    showToast.timeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);
}

function authErrorMessage(error) {
    const knownErrors = {
        "auth/invalid-email": "Correo electrónico no válido.",
        "auth/user-not-found": "No se encontró una cuenta con esos datos.",
        "auth/wrong-password": "No se pudo iniciar sesión. Revisa tus datos.",
        "auth/invalid-credential": "No se pudo iniciar sesión. Revisa tus datos.",
        "auth/email-already-in-use": "Ese correo ya tiene una cuenta.",
        "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
        "auth/popup-closed-by-user": "Se cerró la ventana de acceso.",
        "auth/popup-blocked": "El navegador bloqueó la ventana de acceso.",
        "auth/unauthorized-domain": "Este dominio no está autorizado en Firebase.",
        "auth/operation-not-allowed": "Este método de acceso no está habilitado."
    };

    return knownErrors[error.code] || t("authError");
}

function initializeFirebaseAuth() {
    if (!firebaseConfigured) return;

    if (typeof firebase === "undefined") {
        console.error("Firebase SDK no está disponible.");
        return;
    }

    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        auth = firebase.auth();

        auth.onAuthStateChanged(user => {
            currentUser = user;
            updateAccountLink();
            updateProfile();
        });
    } catch (error) {
        console.error("Error inicializando Firebase:", error);
    }
}

function initializeAuthForms() {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const loginTab = document.getElementById("login-tab");
    const registerTab = document.getElementById("register-tab");

    loginTab?.addEventListener("click", () => {
        loginForm.hidden = false;
        registerForm.hidden = true;
        loginTab.classList.add("active");
        registerTab.classList.remove("active");
    });

    registerTab?.addEventListener("click", () => {
        loginForm.hidden = true;
        registerForm.hidden = false;
        registerTab.classList.add("active");
        loginTab.classList.remove("active");
    });

    loginForm?.addEventListener("submit", async event => {
        event.preventDefault();

        if (!auth) {
            showToast(t("firebaseMissing"));
            return;
        }

        const formData = new FormData(loginForm);
        const email = String(formData.get("email")).trim();
        const password = String(formData.get("password"));

        try {
            await auth.signInWithEmailAndPassword(email, password);
            showToast(t("loginSuccess"));
            document.getElementById("perfil")?.scrollIntoView({
                behavior: "smooth"
            });
        } catch (error) {
            showToast(authErrorMessage(error));
        }
    });

    registerForm?.addEventListener("submit", async event => {
        event.preventDefault();

        if (!auth) {
            showToast(t("firebaseMissing"));
            return;
        }

        const formData = new FormData(registerForm);
        const name = String(formData.get("name")).trim();
        const email = String(formData.get("email")).trim();
        const password = String(formData.get("password"));

        try {
            const credential = await auth.createUserWithEmailAndPassword(
                email,
                password
            );

            await credential.user.updateProfile({ displayName: name });

            currentUser = credential.user;
            updateAccountLink();
            updateProfile();

            showToast(t("registerSuccess"));
        } catch (error) {
            showToast(authErrorMessage(error));
        }
    });

    document.querySelectorAll("[data-provider]").forEach(button => {
        button.addEventListener("click", () => {
            handleSocialLogin(button.dataset.provider);
        });
    });

    document.getElementById("logout-button")?.addEventListener("click", async () => {
        if (!auth) {
            currentUser = null;
            updateAccountLink();
            updateProfile();
            return;
        }

        try {
            await auth.signOut();
            currentUser = null;
            updateAccountLink();
            updateProfile();
            showToast(t("logoutSuccess"));
            document.getElementById("inicio")?.scrollIntoView({
                behavior: "smooth"
            });
        } catch (error) {
            showToast(t("authError"));
        }
    });
}

async function handleSocialLogin(providerName) {
    if (!auth) {
        showToast(t("firebaseMissing"));
        return;
    }

    let provider;

    if (providerName === "Google") {
        provider = new firebase.auth.GoogleAuthProvider();
    } else if (providerName === "Apple") {
        provider = new firebase.auth.OAuthProvider("apple.com");
        provider.addScope("email");
        provider.addScope("name");
    } else {
        return;
    }

    try {
        const credential = await auth.signInWithPopup(provider);
        currentUser = credential.user;
        updateAccountLink();
        updateProfile();
        showToast(t("loginSuccess"));
    } catch (error) {
        showToast(authErrorMessage(error));
    }
}

/* =========================================
   FORMULARIO DE CONTACTO
========================================= */

function initializeContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", event => {
        event.preventDefault();

        const formData = new FormData(form);
        const name = String(formData.get("name")).trim();
        const email = String(formData.get("email")).trim();
        const message = String(formData.get("message")).trim();

        const subject = encodeURIComponent(t("emailSubject"));
        const body = encodeURIComponent(
            `${t("nameLabel")}: ${name}\n` +
            `${t("emailLabel")}: ${email}\n\n` +
            `${t("messageLabel")}:\n${message}`
        );

        showToast(t("contactPrepared"));

        // Abre el programa de correo del usuario.
        // No se envía ni almacena el mensaje en un servidor.
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    });
}

/* =========================================
   INICIALIZACIÓN
========================================= */

function initializePrime() {
    document.getElementById("current-year").textContent =
        new Date().getFullYear();

    const languageSelect = document.getElementById("language-select");
    languageSelect?.addEventListener("change", event => {
        applyLanguage(event.target.value);
    });

    document.getElementById("theme-toggle")?.addEventListener("click", () => {
        applyTheme(currentTheme === "dark" ? "light" : "dark");
    });

    initializeMenu();
    initializeActiveLinks();

    renderCourts();
    renderCoaches();

    document.getElementById("court-search")?.addEventListener(
        "input",
        renderCourts
    );

    document.getElementById("sport-filter")?.addEventListener(
        "change",
        renderCourts
    );

    initializeFirebaseAuth();
    initializeAuthForms();
    initializeContactForm();

    applyTheme(currentTheme);
    applyLanguage(currentLanguage);

    // Inicializa el mapa después de mostrar la sección.
    initializeMap();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePrime, { once: true });
} else {
    initializePrime();
}