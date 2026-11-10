
(()=>{
const D={
"Descobre o valor das tuas":["Buy with a clear head.","Compra con criterio.","Achète avec méthode.","Mit Köpfchen kaufen.","Compra con criterio.","Koop met inzicht.","Compre com critério."],
"Analisar":["Analyse","Analizar","Analyser","Analysieren","Analizza","Analyseren","Analisar"],
"Início":["Home","Inicio","Accueil","Startseite","Home","Home","Início"],
"Pesquisar":["Search","Buscar","Rechercher","Suchen","Cerca","Zoeken","Pesquisar"],
"Coleções":["Collections","Colecciones","Collections","Sammlungen","Collezioni","Collecties","Coleções"],
"Guias":["Guides","Guías","Guides","Guides","Guide","Gidsen","Guias"],
"Sobre":["About","Acerca de","À propos","Über uns","Informazioni","Over","Sobre"],
"Entrar":["Log in","Entrar","Connexion","Anmelden","Accedi","Inloggen","Entrar"],
"Criar Conta":["Sign up","Crear cuenta","Créer un compte","Konto erstellen","Crea account","Account maken","Criar conta"],
"Criar conta":["Create account","Crear cuenta","Créer un compte","Konto erstellen","Crea account","Account maken","Criar conta"],
"Fotografias":["Photos","Fotos","Photos","Fotos","Foto","Foto’s","Fotos"],
"Envia fotografias nítidas da frente, verso e detalhes. A IA ajuda a identificar o modelo; confirma sempre os pormenores.":["Upload clear photos of the front, back and details. AI can help identify the model; always verify the details.","Sube fotos nítidas del frente, reverso y detalles. La IA ayuda a identificar el modelo; comprueba siempre los detalles.","Ajoute des photos nettes de l’avant, de l’arrière et des détails. L’IA aide à identifier le modèle ; vérifie toujours les informations.","Lade klare Fotos von Vorderseite, Rückseite und Details hoch. KI hilft bei der Modellbestimmung; prüfe die Angaben immer.","Carica foto nitide del fronte, retro e dettagli. L’IA aiuta a identificare il modello; verifica sempre i dettagli.","Upload duidelijke foto’s van de voor-, achterkant en details. AI helpt het model te herkennen; controleer de gegevens altijd.","Envie fotos nítidas da frente, do verso e dos detalhes. A IA ajuda a identificar o modelo; confira sempre as informações."],
"Dados do modelo":["Model details","Datos del modelo","Détails du modèle","Modelldaten","Dati del modello","Modelgegevens","Dados do modelo"],
"Modelo / nome *":["Model / name *","Modelo / nombre *","Modèle / nom *","Modell / Name *","Modello / nome *","Model / naam *","Modelo / nome *"],
"Ano / série / referência":["Year / series / reference","Año / serie / referencia","Année / série / référence","Jahr / Serie / Referenz","Anno / serie / riferimento","Jaar / serie / referentie","Ano / série / referência"],
"Classificação":["Classification","Clasificación","Classification","Klassifizierung","Classificazione","Classificatie","Classificação"],
"Estado":["Condition","Estado","État","Zustand","Condizioni","Staat","Estado"],
"Avaliação de compra":["Purchase assessment","Evaluación de compra","Évaluation d’achat","Kaufbewertung","Valutazione acquisto","Aankoopbeoordeling","Avaliação de compra"],
"Preço pedido (€)":["Asking price (€)","Precio solicitado (€)","Prix demandé (€)","Angebotspreis (€)","Prezzo richiesto (€)","Vraagprijs (€)","Preço anunciado (€)"],
"Portes e taxas (€)":["Shipping and fees (€)","Envío y tasas (€)","Livraison et frais (€)","Versand und Gebühren (€)","Spedizione e costi (€)","Verzending en kosten (€)","Frete e taxas (€)"],
"Vendas concluídas comparáveis":["Comparable completed sales","Ventas comparables cerradas","Ventes comparables conclues","Vergleichbare abgeschlossene Verkäufe","Vendite comparabili concluse","Vergelijkbare afgeronde verkopen","Vendas comparáveis concluídas"],
"Confirmação TH/STH":["TH/STH confirmation","Confirmación TH/STH","Confirmation TH/STH","TH/STH-Bestätigung","Conferma TH/STH","TH/STH-bevestiging","Confirmação TH/STH"],
"Evidências / links de vendas concluídas":["Evidence / completed-sale links","Pruebas / enlaces de ventas cerradas","Preuves / liens de ventes conclues","Nachweise / Links zu abgeschlossenen Verkäufen","Prove / link di vendite concluse","Bewijs / links naar afgeronde verkopen","Evidências / links de vendas concluídas"],
"Notas e justificação":["Notes and reasoning","Notas y justificación","Notes et justification","Notizen und Begründung","Note e motivazione","Notities en onderbouwing","Notas e justificativa"],
"Pesquisar vendas concluídas":["Search completed sales","Buscar ventas cerradas","Rechercher les ventes conclues","Abgeschlossene Verkäufe suchen","Cerca vendite concluse","Zoek afgeronde verkopen","Pesquisar vendas concluídas"],
"Avaliar oportunidade":["Assess opportunity","Evaluar oportunidad","Évaluer l’opportunité","Kaufgelegenheit bewerten","Valuta opportunità","Kans beoordelen","Avaliar oportunidade"],
"Limpar":["Clear","Limpiar","Effacer","Leeren","Pulisci","Wissen","Limpar"],
"A minha coleção":["My collection","Mi colección","Ma collection","Meine Sammlung","La mia collezione","Mijn collectie","Minha coleção"],
"Ainda não tens modelos guardados.":["No models saved yet.","Aún no tienes modelos guardados.","Aucun modèle enregistré pour le moment.","Noch keine Modelle gespeichert.","Non hai ancora modelli salvati.","Je hebt nog geen modellen opgeslagen.","Ainda não há modelos guardados."],
"Exportar cópia CSV":["Export CSV backup","Exportar copia CSV","Exporter une copie CSV","CSV-Sicherung exportieren","Esporta copia CSV","CSV-back-up exporteren","Exportar cópia CSV"],
"Lista de procura":["Watchlist","Lista de búsqueda","Liste de recherche","Merkliste","Lista dei desideri","Zoeklijst","Lista de procura"],
"Modelo procurado":["Wanted model","Modelo buscado","Modèle recherché","Gesuchtes Modell","Modello cercato","Gezocht model","Modelo procurado"],
"Preço máximo (€)":["Maximum price (€)","Precio máximo (€)","Prix maximum (€)","Höchstpreis (€)","Prezzo massimo (€)","Maximumprijs (€)","Preço máximo (€)"],
"Adicionar":["Add","Añadir","Ajouter","Hinzufügen","Aggiungi","Toevoegen","Adicionar"],
"Lista vazia.":["List is empty.","Lista vacía.","La liste est vide.","Liste ist leer.","Lista vuota.","De lijst is leeg.","Lista vazia."],
"Identificar com Gemini":["Identify with Gemini","Identificar con Gemini","Identifier avec Gemini","Mit Gemini identifizieren","Identifica con Gemini","Identificeren met Gemini","Identificar com Gemini"],
"Visão geral":["Overview","Resumen","Vue d’ensemble","Übersicht","Panoramica","Overzicht","Visão geral"],
"Perfil":["Profile","Perfil","Profil","Profil","Profilo","Profiel","Perfil"],
"Segurança":["Security","Seguridad","Sécurité","Sicherheit","Sicurezza","Beveiliging","Segurança"],
"Preferências":["Preferences","Preferencias","Préférences","Einstellungen","Preferenze","Voorkeuren","Preferências"],
"Atividade":["Activity","Actividad","Activité","Aktivität","Attività","Activiteit","Atividade"],
"Terminar sessão":["Log out","Cerrar sesión","Se déconnecter","Abmelden","Esci","Uitloggen","Terminar sessão"],
"Estado da garagem":["Garage status","Estado del garaje","État du garage","Garagenstatus","Stato del garage","Garagestatus","Estado da garagem"],
"Um resumo rápido da tua conta e atividade de colecionador.":["A quick summary of your account and collector activity.","Un resumen rápido de tu cuenta y actividad como coleccionista.","Un résumé rapide de ton compte et de ton activité de collectionneur.","Eine kurze Übersicht über dein Konto und deine Sammleraktivität.","Un riepilogo del tuo account e della tua attività da collezionista.","Een kort overzicht van je account en verzamelactiviteit.","Um resumo rápido da tua conta e atividade de colecionador."],
"Atividade recente":["Recent activity","Actividad reciente","Activité récente","Letzte Aktivität","Attività recente","Recente activiteit","Atividade recente"],
"Informação pessoal":["Personal information","Información personal","Informations personnelles","Persönliche Informationen","Informazioni personali","Persoonlijke informatie","Informação pessoal"],
"Nome de perfil":["Profile name","Nombre de perfil","Nom du profil","Profilname","Nome profilo","Profielnaam","Nome do perfil"],
"Guardar perfil":["Save profile","Guardar perfil","Enregistrer le profil","Profil speichern","Salva profilo","Profiel opslaan","Guardar perfil"],
"Alterar endereço de email":["Change email address","Cambiar dirección de correo","Modifier l’adresse e-mail","E-Mail-Adresse ändern","Modifica indirizzo email","E-mailadres wijzigen","Alterar endereço de email"],
"Alterar palavra-passe":["Change password","Cambiar contraseña","Modifier le mot de passe","Passwort ändern","Modifica password","Wachtwoord wijzigen","Alterar senha"],
"Nova palavra-passe":["New password","Nueva contraseña","Nouveau mot de passe","Neues Passwort","Nuova password","Nieuw wachtwoord","Nova senha"],
"Confirmar palavra-passe":["Confirm password","Confirmar contraseña","Confirmer le mot de passe","Passwort bestätigen","Conferma password","Wachtwoord bevestigen","Confirmar senha"],
"Atualizar palavra-passe":["Update password","Actualizar contraseña","Mettre à jour le mot de passe","Passwort aktualisieren","Aggiorna password","Wachtwoord bijwerken","Atualizar senha"],
"Idioma e aparência":["Language and appearance","Idioma y apariencia","Langue et apparence","Sprache und Darstellung","Lingua e aspetto","Taal en weergave","Idioma e aparência"],
"Idioma da aplicação":["App language","Idioma de la aplicación","Langue de l’application","App-Sprache","Lingua dell’app","App-taal","Idioma da aplicação"],
"Aparência":["Appearance","Apariencia","Apparence","Darstellung","Aspetto","Weergave","Aparência"],
"Guardar preferências":["Save preferences","Guardar preferencias","Enregistrer les préférences","Einstellungen speichern","Salva preferenze","Voorkeuren opslaan","Guardar preferências"],
"Pesquisar modelo…":["Search model…","Buscar modelo…","Rechercher un modèle…","Modell suchen…","Cerca modello…","Zoek model…","Buscar modelo…"],
"Ver ficha":["View details","Ver ficha","Voir la fiche","Details ansehen","Vedi scheda","Bekijk details","Ver ficha"],
"Ver fotos":["View photos","Ver fotos","Voir les photos","Fotos ansehen","Vedi foto","Bekijk foto's","Ver fotos"],
"Não foram encontrados modelos com estes filtros.":["No models match these filters.","No se encontraron modelos con estos filtros.","Aucun modèle ne correspond à ces filtres.","Keine Modelle entsprechen diesen Filtern.","Nessun modello trovato con questi filtri.","Geen modellen gevonden met deze filters.","Não foram encontrados modelos com estes filtros."],
"Área do colecionador":["Collector area","Área del coleccionista","Espace collectionneur","Sammlerbereich","Area collezionista","Verzamelaaromgeving","Área do colecionador"],
"O teu espaço pessoal para gerir o perfil, proteger o acesso e acompanhar a tua garagem de miniaturas.":["Your personal space to manage your profile, secure access and track your miniature garage.","Tu espacio personal para gestionar tu perfil, proteger el acceso y seguir tu garaje de miniaturas.","Ton espace personnel pour gérer ton profil, sécuriser l’accès et suivre ton garage de miniatures.","Dein persönlicher Bereich zur Profilverwaltung, zum Schutz deines Zugangs und zur Übersicht deiner Miniaturensammlung.","Il tuo spazio personale per gestire il profilo, proteggere l’accesso e seguire il tuo garage di miniature.","Je persoonlijke omgeving om je profiel te beheren, je toegang te beveiligen en je miniatuurgarage te volgen.","O teu espaço pessoal para gerir o perfil, proteger o acesso e acompanhar a tua garagem de miniaturas."],
"PAINEL DO COLECIONADOR":["COLLECTOR DASHBOARD","PANEL DEL COLECCIONISTA","TABLEAU DE BORD DU COLLECTIONNEUR","SAMMLER-DASHBOARD","PANNELLO DEL COLLEZIONISTA","VERZAMELAARSDASHBOARD","PAINEL DO COLECIONADOR"],
"O TEU PAINEL":["YOUR DASHBOARD","TU PANEL","TON TABLEAU DE BORD","DEIN DASHBOARD","IL TUO PANNELLO","JOUW DASHBOARD","O TEU PAINEL"],
"Plano atual":["Current plan","Plan actual","Forfait actuel","Aktueller Tarif","Piano attuale","Huidig abonnement","Plano atual"],
"Acesso de colecionador":["Collector access","Acceso de coleccionista","Accès collectionneur","Sammlerzugang","Accesso collezionista","Verzamelaarstoegang","Acesso de colecionador"],
"Pesquisas diárias":["Daily searches","Búsquedas diarias","Recherches quotidiennes","Tägliche Suchen","Ricerche giornaliere","Dagelijkse zoekopdrachten","Pesquisas diárias"],
"Limite do plano gratuito":["Free plan limit","Límite del plan gratuito","Limite de l’offre gratuite","Limit des kostenlosen Tarifs","Limite del piano gratuito","Limiet van het gratis abonnement","Limite do plano gratuito"],
"Na tua garagem":["In your garage","En tu garaje","Dans ton garage","In deiner Garage","Nel tuo garage","In je garage","Na tua garagem"],
"Dados da conta":["Account details","Datos de la cuenta","Détails du compte","Kontodaten","Dati dell’account","Accountgegevens","Dados da conta"],
"Membro desde":["Member since","Miembro desde","Membre depuis","Mitglied seit","Membro dal","Lid sinds","Membro desde"],
"Estado do email":["Email status","Estado del correo","État de l’e-mail","E-Mail-Status","Stato dell’email","E-mailstatus","Estado do email"],
"Editar perfil":["Edit profile","Editar perfil","Modifier le profil","Profil bearbeiten","Modifica profilo","Profiel bewerken","Editar perfil"],
"Ver atividade completa →":["View full activity →","Ver toda la actividad →","Voir toute l’activité →","Gesamte Aktivität ansehen →","Visualizza tutta l’attività →","Bekijk alle activiteit →","Ver atividade completa →"],
"O Premium pago renova mensalmente. Podes cancelar a renovação a qualquer momento e manténs o acesso até ao fim do período já pago.":["Paid Premium renews monthly. You can cancel renewal at any time and keep access until the end of the period already paid.","Premium se renueva mensualmente. Puedes cancelar la renovación cuando quieras y conservar el acceso hasta el final del periodo pagado.","L’abonnement Premium est renouvelé chaque mois. Tu peux annuler le renouvellement à tout moment et conserver l’accès jusqu’à la fin de la période payée.","Premium wird monatlich verlängert. Du kannst jederzeit kündigen und behältst den Zugang bis zum Ende des bereits bezahlten Zeitraums.","Premium si rinnova ogni mese. Puoi annullare il rinnovo in qualsiasi momento e mantenere l’accesso fino alla fine del periodo già pagato.","Premium wordt maandelijks verlengd. Je kunt op elk moment opzeggen en behoudt toegang tot het einde van de reeds betaalde periode.","O Premium pago renova mensalmente. Podes cancelar a renovação a qualquer momento e manténs o acesso até ao fim do período já pago."],
"IDENTIDADE DO PILOTO":["DRIVER IDENTITY","IDENTIDAD DEL PILOTO","IDENTITÉ DU PILOTE","FAHRERIDENTITÄT","IDENTITÀ DEL PILOTA","IDENTITEIT VAN DE COUREUR","IDENTIDADE DO PILOTO"],
"Atualiza o nome apresentado na tua área pessoal.":["Update the name shown in your personal area.","Actualiza el nombre que aparece en tu área personal.","Mets à jour le nom affiché dans ton espace personnel.","Aktualisiere den Namen, der in deinem persönlichen Bereich angezeigt wird.","Aggiorna il nome visualizzato nella tua area personale.","Werk de naam bij die in je persoonlijke omgeving wordt weergegeven.","Atualiza o nome apresentado na tua área pessoal."],
"O nome de perfil fica associado à tua conta HW Price Check.":["Your profile name is linked to your HW Price Check account.","El nombre de perfil está asociado a tu cuenta de HW Price Check.","Le nom de profil est associé à ton compte HW Price Check.","Dein Profilname ist mit deinem HW-Price-Check-Konto verknüpft.","Il nome del profilo è associato al tuo account HW Price Check.","Je profielnaam is gekoppeld aan je HW Price Check-account.","O nome de perfil fica associado à tua conta HW Price Check."],
"PROTEÇÃO DA CONTA":["ACCOUNT PROTECTION","PROTECCIÓN DE LA CUENTA","PROTECTION DU COMPTE","KONTOSCHUTZ","PROTEZIONE DELL’ACCOUNT","ACCOUNTBEVEILIGING","PROTEÇÃO DA CONTA"],
"Atualiza a palavra-passe usada para entrar no HW Price Check.":["Update the password used to sign in to HW Price Check.","Actualiza la contraseña que utilizas para acceder a HW Price Check.","Mets à jour le mot de passe utilisé pour te connecter à HW Price Check.","Aktualisiere das Passwort für die Anmeldung bei HW Price Check.","Aggiorna la password utilizzata per accedere a HW Price Check.","Werk het wachtwoord bij waarmee je je aanmeldt bij HW Price Check.","Atualiza a palavra-passe usada para entrar no HW Price Check."],
"Escolhe uma palavra-passe com pelo menos 8 caracteres. Não reutilizes a palavra-passe do teu email.":["Choose a password with at least 8 characters. Do not reuse your email password.","Elige una contraseña de al menos 8 caracteres. No reutilices la contraseña de tu correo.","Choisis un mot de passe d’au moins 8 caractères. Ne réutilise pas celui de ton e-mail.","Wähle ein Passwort mit mindestens 8 Zeichen. Verwende nicht dein E-Mail-Passwort erneut.","Scegli una password di almeno 8 caratteri. Non riutilizzare la password della tua email.","Kies een wachtwoord van minstens 8 tekens. Gebruik niet opnieuw je e-mailwachtwoord.","Escolhe uma palavra-passe com pelo menos 8 caracteres. Não reutilizes a palavra-passe do teu email."],
"Esta sessão está protegida pelo serviço de autenticação do Supabase.":["This session is protected by Supabase authentication.","Esta sesión está protegida por el servicio de autenticación de Supabase.","Cette session est protégée par le service d’authentification Supabase.","Diese Sitzung wird durch den Supabase-Authentifizierungsdienst geschützt.","Questa sessione è protetta dal servizio di autenticazione Supabase.","Deze sessie wordt beschermd door de authenticatieservice van Supabase.","Esta sessão está protegida pelo serviço de autenticação do Supabase."],
"AFINA A TUA EXPERIÊNCIA":["CUSTOMIZE YOUR EXPERIENCE","PERSONALIZA TU EXPERIENCIA","PERSONNALISE TON EXPÉRIENCE","PASSE DEIN ERLEBNIS AN","PERSONALIZZA LA TUA ESPERIENZA","PAS JE ERVARING AAN","AFINA A TUA EXPERIÊNCIA"],
"Personaliza a apresentação do HW Price Check.":["Customize how HW Price Check looks.","Personaliza la apariencia de HW Price Check.","Personnalise l’apparence de HW Price Check.","Passe die Darstellung von HW Price Check an.","Personalizza l’aspetto di HW Price Check.","Pas de weergave van HW Price Check aan.","Personaliza a apresentação do HW Price Check."],
"As preferências ficam guardadas nesta conta e neste dispositivo.":["Preferences are saved to this account and device.","Las preferencias se guardan en esta cuenta y en este dispositivo.","Les préférences sont enregistrées sur ce compte et cet appareil.","Einstellungen werden für dieses Konto und Gerät gespeichert.","Le preferenze vengono salvate su questo account e dispositivo.","Voorkeuren worden opgeslagen voor dit account en apparaat.","As preferências ficam guardadas nesta conta e neste dispositivo."],
"Escuro · Garage":["Dark · Garage","Oscuro · Garage","Sombre · Garage","Dunkel · Garage","Scuro · Garage","Donker · Garage","Escuro · Garage"],
"A alteração do idioma atualiza os textos que já estão traduzidos na aplicação. Algumas áreas poderão continuar em português enquanto não forem traduzidas.":["Changing the language updates the text already translated in the app. Some areas may remain in Portuguese until their translations are added.","Al cambiar el idioma se actualizan los textos ya traducidos de la aplicación. Algunas áreas pueden seguir en portugués hasta que se traduzcan.","Le changement de langue met à jour les textes déjà traduits dans l’application. Certaines zones peuvent rester en portugais jusqu’à leur traduction.","Beim Ändern der Sprache werden bereits übersetzte Texte aktualisiert. Einige Bereiche können bis zur Übersetzung auf Portugiesisch bleiben.","Il cambio di lingua aggiorna i testi già tradotti nell’app. Alcune aree potrebbero restare in portoghese finché non saranno tradotte.","Als je de taal wijzigt, worden de reeds vertaalde teksten bijgewerkt. Sommige onderdelen kunnen Portugees blijven totdat ze vertaald zijn.","A alteração do idioma atualiza os textos já traduzidos na aplicação. Algumas áreas poderão continuar em português até serem traduzidas."],
"REGISTO DA GARAGEM":["GARAGE LOG","REGISTRO DEL GARAJE","JOURNAL DU GARAGE","GARAGENPROTOKOLL","REGISTRO DEL GARAGE","GARAGELOGBOEK","REGISTO DA GARAGEM"],
"Consulta as análises que guardaste e os modelos adicionados à lista de procura.":["Review saved assessments and models added to your watchlist.","Consulta los análisis guardados y los modelos añadidos a tu lista de búsqueda.","Consulte les évaluations enregistrées et les modèles ajoutés à ta liste de recherche.","Sieh dir gespeicherte Bewertungen und Modelle auf deiner Merkliste an.","Consulta le valutazioni salvate e i modelli aggiunti alla lista dei desideri.","Bekijk opgeslagen analyses en modellen op je zoeklijst.","Consulta as análises guardadas e os modelos adicionados à lista de procura."],
"Movimentos recentes":["Recent activity","Movimientos recientes","Activité récente","Letzte Aktivitäten","Attività recenti","Recente activiteit","Movimentos recentes"],
"Este histórico reflete os itens guardados na tua coleção e lista de procura. Não representa um registo de acessos ou sessões.":["This history shows items saved to your collection and watchlist. It is not a log of sign-ins or sessions.","Este historial muestra los elementos guardados en tu colección y lista de búsqueda. No registra accesos ni sesiones.","Cet historique présente les éléments enregistrés dans ta collection et ta liste de recherche. Il ne répertorie pas les connexions ni les sessions.","Dieser Verlauf zeigt gespeicherte Elemente deiner Sammlung und Merkliste. Er protokolliert keine Anmeldungen oder Sitzungen.","Questo storico mostra gli elementi salvati nella collezione e nella lista dei desideri. Non registra accessi o sessioni.","Deze geschiedenis toont items in je collectie en zoeklijst. Het is geen overzicht van aanmeldingen of sessies.","Este histórico mostra os itens guardados na tua coleção e lista de procura. Não regista acessos ou sessões."],
"Pesquisar modelo":["Search model","Buscar modelo","Rechercher un modèle","Modell suchen","Cerca modello","Zoek model","Pesquisar modelo"],
"Preços de Mercado":["Market prices","Precios de mercado","Prix du marché","Marktpreise","Prezzi di mercato","Marktprijzen","Preços de mercado"],
"Vendas reais e valores atualizados":["Real sales and updated values","Ventas reales y valores actualizados","Ventes réelles et valeurs actualisées","Echte Verkäufe und aktuelle Werte","Vendite reali e valori aggiornati","Echte verkopen en actuele waarden","Vendas reais e valores atualizados"],
"Análise com IA":["AI analysis","Análisis con IA","Analyse par IA","KI-Analyse","Analisi con IA","AI-analyse","Análise com IA"],
"Detalhes, raridade e estimativa de valor":["Details, rarity and estimated value","Detalles, rareza y estimación de valor","Détails, rareté et estimation de valeur","Details, Seltenheit und Wertschätzung","Dettagli, rarità e stima del valore","Details, zeldzaamheid en geschatte waarde","Detalhes, raridade e estimativa de valor"],
"A Minha Coleção":["My Collection","Mi colección","Ma collection","Meine Sammlung","La mia collezione","Mijn collectie","A Minha Coleção"],
"Organiza e acompanha os teus modelos":["Organize and track your models","Organiza y sigue tus modelos","Organise et suis tes modèles","Organisiere und verfolge deine Modelle","Organizza e monitora i tuoi modelli","Organiseer en volg je modellen","Organiza e acompanha os teus modelos"],
"Guias de Colecionador":["Collector guides","Guías para coleccionistas","Guides du collectionneur","Sammlerleitfäden","Guide per collezionisti","Verzamelaarsgidsen","Guias de colecionador"],
"TH, STH, séries e dicas úteis":["TH, STH, series and useful tips","TH, STH, series y consejos útiles","TH, STH, séries et conseils utiles","TH, STH, Serien und nützliche Tipps","TH, STH, serie e consigli utili","TH, STH, series en handige tips","TH, STH, séries e dicas úteis"],
"Treasure Hunts & Super Treasure Hunts":["Treasure Hunts & Super Treasure Hunts","Treasure Hunts y Super Treasure Hunts","Treasure Hunts et Super Treasure Hunts","Treasure Hunts & Super Treasure Hunts","Treasure Hunt e Super Treasure Hunt","Treasure Hunts & Super Treasure Hunts","Treasure Hunts e Super Treasure Hunts"],
"Consulta os modelos por ano, distingue TH de STH e usa os intervalos apenas como referência inicial.":["Browse models by year, distinguish TH from STH, and use price ranges only as an initial reference.","Consulta los modelos por año, distingue TH de STH y utiliza los rangos solo como referencia inicial.","Consulte les modèles par année, distingue les TH des STH et utilise les fourchettes comme simple référence initiale.","Durchsuche Modelle nach Jahr, unterscheide TH von STH und nutze Preisspannen nur als erste Orientierung.","Consulta i modelli per anno, distingui TH da STH e usa gli intervalli solo come riferimento iniziale.","Bekijk modellen per jaar, maak onderscheid tussen TH en STH en gebruik prijsindicaties alleen als eerste richtlijn.","Consulta os modelos por ano, distingue TH de STH e usa os intervalos apenas como referência inicial."],
"Ordenar":["Sort","Ordenar","Trier","Sortieren","Ordina","Sorteren","Ordenar"],
"Ordem da série":["Series order","Orden de la serie","Ordre de la série","Reihenfolge der Serie","Ordine della serie","Volgorde van de serie","Ordem da série"],
"Nome A–Z":["Name A–Z","Nombre A–Z","Nom A–Z","Name A–Z","Nome A–Z","Naam A–Z","Nome A–Z"],
"Nome Z–A":["Name Z–A","Nombre Z–A","Nom Z–A","Name Z–A","Nome Z–A","Naam Z–A","Nome Z–A"],
"Valores indicativos em euros.":["Indicative values in euros.","Valores orientativos en euros.","Valeurs indicatives en euros.","Richtwerte in Euro.","Valori indicativi in euro.","Indicatieve waarden in euro.","Valores indicativos em euros."],
"Não são cotações garantidas nem vendas confirmadas. O preço varia com país, estado do blister, variante e procura. Para preços fiáveis, compara vendas concluídas recentes.":["These are not guaranteed quotes or confirmed sales. Prices vary by country, blister condition, variant and demand. For reliable pricing, compare recent completed sales.","No son cotizaciones garantizadas ni ventas confirmadas. El precio varía según el país, el estado del blíster, la variante y la demanda. Para obtener precios fiables, compara ventas cerradas recientes.","Il ne s’agit ni de cotations garanties ni de ventes confirmées. Le prix varie selon le pays, l’état du blister, la variante et la demande. Pour des prix fiables, compare les ventes récentes conclues.","Dies sind weder garantierte Bewertungen noch bestätigte Verkäufe. Der Preis hängt von Land, Blisterzustand, Variante und Nachfrage ab. Vergleiche aktuelle abgeschlossene Verkäufe.","Non sono quotazioni garantite né vendite confermate. Il prezzo varia in base a paese, condizioni della confezione, variante e domanda. Per prezzi affidabili, confronta vendite concluse recenti.","Dit zijn geen gegarandeerde waarderingen of bevestigde verkopen. De prijs verschilt per land, blisterstaat, variant en vraag. Vergelijk recente afgeronde verkopen voor betrouwbare prijzen.","Não são cotações garantidas nem vendas confirmadas. O preço varia com o país, o estado do blister, a variante e a procura. Para preços fiáveis, compara vendas concluídas recentes."],
"Ver fotografia e detalhes ↗":["View photos and details ↗","Ver fotos y detalles ↗","Voir les photos et les détails ↗","Fotos und Details ansehen ↗","Vedi foto e dettagli ↗","Bekijk foto's en details ↗","Ver fotografias e detalhes ↗"],
"Estimativa:":["Estimate:","Estimación:","Estimation :","Schätzung:","Stima:","Schatting:","Estimativa:"],
"Sem estimativa fiável":["No reliable estimate","Sin estimación fiable","Aucune estimation fiable","Keine verlässliche Schätzung","Nessuna stima affidabile","Geen betrouwbare schatting","Sem estimativa fiável"],
"Ano":["Year","Año","Année","Jahr","Anno","Jaar","Ano"],
"Arquivo histórico":["Historical archive","Archivo histórico","Archives historiques","Historisches Archiv","Archivio storico","Historisch archief","Arquivo histórico"],
"A série Super Treasure Hunt começou em 2007.":["The Super Treasure Hunt series began in 2007.","La serie Super Treasure Hunt comenzó en 2007.","La série Super Treasure Hunt a commencé en 2007.","Die Super-Treasure-Hunt-Serie begann 2007.","La serie Super Treasure Hunt è iniziata nel 2007.","De Super Treasure Hunt-serie begon in 2007.","A série Super Treasure Hunt começou em 2007."],
"Sem estimativa individual fiável":["No reliable individual estimate","Sin estimación individual fiable","Aucune estimation individuelle fiable","Keine verlässliche Einzelschätzung","Nessuna stima individuale affidabile","Geen betrouwbare individuele schatting","Sem estimativa individual fiável"],
"Intervalo indicativo:":["Indicative range:","Rango orientativo:","Fourchette indicative :","Richtwert:","Intervallo indicativo:","Indicatieve bandbreedte:","Intervalo indicativo:"],
"Miniatura carded, estado por confirmar":["Carded miniature, condition to be confirmed","Miniatura en blíster, estado por confirmar","Miniature sous blister, état à confirmer","Miniatur in Blisterverpackung, Zustand zu bestätigen","Miniatura in blister, condizioni da verificare","Miniatuur in blister, staat nog te controleren","Miniatura em blister, estado por confirmar"],
"Fotografia de referência disponível na checklist externa":["Reference photo available in the external checklist","Foto de referencia disponible en la lista externa","Photo de référence disponible dans la liste externe","Referenzfoto in der externen Checkliste verfügbar","Foto di riferimento disponibile nella checklist esterna","Referentiefoto beschikbaar in de externe checklist","Fotografia de referência disponível na checklist externa"],
"Confirmado":["Confirmed","Confirmado","Confirmé","Bestätigt","Confermato","Bevestigd","Confirmado"],
"Pendente":["Pending","Pendiente","En attente","Ausstehend","In attesa","In afwachting","Pendente"],
"Gratuito":["Free","Gratis","Gratuit","Kostenlos","Gratuito","Gratis","Gratuito"],
"Premium permanente":["Lifetime Premium","Premium permanente","Premium à vie","Dauerhaftes Premium","Premium permanente","Levenslang Premium","Premium permanente"],
"Acesso permanente":["Lifetime access","Acceso permanente","Accès à vie","Dauerhafter Zugang","Accesso permanente","Levenslange toegang","Acesso permanente"],
"Plano gratuito ativo":["Free plan active","Plan gratuito activo","Offre gratuite active","Kostenloser Tarif aktiv","Piano gratuito attivo","Gratis abonnement actief","Plano gratuito ativo"],
"Sem limite diário · Premium ativo":["No daily limit · Premium active","Sin límite diario · Premium activo","Aucune limite quotidienne · Premium actif","Kein Tageslimit · Premium aktiv","Nessun limite giornaliero · Premium attivo","Geen dagelijkse limiet · Premium actief","Sem limite diário · Premium ativo"],
"Limite atual do plano gratuito":["Current free plan limit","Límite actual del plan gratuito","Limite actuel de l’offre gratuite","Aktuelles Limit des kostenlosen Tarifs","Limite attuale del piano gratuito","Huidige limiet van het gratis abonnement","Limite atual do plano gratuito"],
"Não foi possível atualizar o estado do plano neste momento.":["Unable to update plan status right now.","No se pudo actualizar el estado del plan en este momento.","Impossible de mettre à jour le statut de l’offre pour le moment.","Der Tarifstatus kann derzeit nicht aktualisiert werden.","Impossibile aggiornare lo stato del piano al momento.","De abonnementsstatus kan momenteel niet worden bijgewerkt.","Não foi possível atualizar o estado do plano neste momento."],
"Perfil atualizado com sucesso.":["Profile updated successfully.","Perfil actualizado correctamente.","Profil mis à jour avec succès.","Profil erfolgreich aktualisiert.","Profilo aggiornato con successo.","Profiel succesvol bijgewerkt.","Perfil atualizado com sucesso."],
"O nome de perfil não pode ultrapassar 60 caracteres.":["The profile name cannot exceed 60 characters.","El nombre de perfil no puede superar los 60 caracteres.","Le nom du profil ne peut pas dépasser 60 caractères.","Der Profilname darf höchstens 60 Zeichen enthalten.","Il nome del profilo non può superare i 60 caratteri.","De profielnaam mag niet langer zijn dan 60 tekens.","O nome do perfil não pode exceder 60 caracteres."],
"Preenche o email e a palavra-passe.":["Enter your email and password.","Introduce el correo y la contraseña.","Saisis ton e-mail et ton mot de passe.","Gib deine E-Mail-Adresse und dein Passwort ein.","Inserisci email e password.","Vul je e-mailadres en wachtwoord in.","Preenche o email e a palavra-passe."],
"A palavra-passe deve ter pelo menos 8 caracteres.":["Password must be at least 8 characters.","La contraseña debe tener al menos 8 caracteres.","Le mot de passe doit contenir au moins 8 caractères.","Das Passwort muss mindestens 8 Zeichen lang sein.","La password deve contenere almeno 8 caratteri.","Het wachtwoord moet minstens 8 tekens bevatten.","A palavra-passe deve ter pelo menos 8 caracteres."],
"A guardar…":["Saving…","Guardando…","Enregistrement…","Wird gespeichert…","Salvataggio…","Opslaan…","A guardar…"],
"A enviar…":["Sending…","Enviando…","Envoi…","Wird gesendet…","Invio…","Verzenden…","A enviar…"],
"Inicia sessão primeiro.":["Log in first.","Inicia sesión primero.","Connecte-toi d’abord.","Bitte zuerst anmelden.","Accedi prima.","Log eerst in.","Inicia sessão primeiro."],
"Visitantes: indisponível":["Visitors: unavailable","Visitantes: no disponible","Visiteurs : indisponible","Besucher: nicht verfügbar","Visitatori: non disponibili","Bezoekers: niet beschikbaar","Visitantes: indisponível"],
"Pesquisar um modelo Hot Wheels...":["Search for a Hot Wheels model...","Buscar un modelo Hot Wheels...","Rechercher un modèle Hot Wheels...","Hot-Wheels-Modell suchen...","Cerca un modello Hot Wheels...","Zoek een Hot Wheels-model...","Pesquisar um modelo Hot Wheels..."],
"SOBRE O PROJECTO":["ABOUT THE PROJECT","SOBRE EL PROYECTO","À PROPOS DU PROJET","ÜBER DAS PROJEKT","INFORMAZIONI SUL PROGETTO","OVER HET PROJECT","SOBRE O PROJETO"],
"Uma ferramenta independente para colecionadores.":["An independent tool for collectors.","Una herramienta independiente para coleccionistas.","Un outil indépendant pour les collectionneurs.","Ein unabhängiges Tool für Sammler.","Uno strumento indipendente per collezionisti.","Een onafhankelijke tool voor verzamelaars.","Uma ferramenta independente para colecionadores."],
"HW Price Check ajuda-te a identificar modelos, organizar a coleção e tomar decisões de compra com informação mais clara. As estimativas são indicativas e não garantem valorização.":["HW Price Check helps you identify models, organize your collection and make better-informed buying decisions. Estimates are indicative and do not guarantee appreciation.","HW Price Check te ayuda a identificar modelos, organizar tu colección y tomar decisiones de compra con información más clara. Las estimaciones son orientativas y no garantizan una revalorización.","HW Price Check t’aide à identifier les modèles, organiser ta collection et prendre des décisions d’achat mieux informées. Les estimations sont indicatives et ne garantissent aucune plus-value.","HW Price Check hilft dir, Modelle zu identifizieren, deine Sammlung zu organisieren und fundiertere Kaufentscheidungen zu treffen. Schätzungen sind Richtwerte und garantieren keine Wertsteigerung.","HW Price Check ti aiuta a identificare i modelli, organizzare la tua collezione e prendere decisioni d’acquisto più consapevoli. Le stime sono indicative e non garantiscono aumenti di valore.","HW Price Check helpt je modellen te identificeren, je collectie te organiseren en beter geïnformeerde aankoopbeslissingen te nemen. Schattingen zijn indicatief en garanderen geen waardestijging.","O HW Price Check ajuda-te a identificar modelos, organizar a coleção e tomar decisões de compra com informação mais clara. As estimativas são indicativas e não garantem valorização."],
"© 2026 HW Price Check. Projecto independente, não afiliado à Mattel.":["© 2026 HW Price Check. Independent project, not affiliated with Mattel.","© 2026 HW Price Check. Proyecto independiente, no afiliado a Mattel.","© 2026 HW Price Check. Projet indépendant, non affilié à Mattel.","© 2026 HW Price Check. Unabhängiges Projekt, nicht mit Mattel verbunden.","© 2026 HW Price Check. Progetto indipendente, non affiliato a Mattel.","© 2026 HW Price Check. Onafhankelijk project, niet verbonden met Mattel.","© 2026 HW Price Check. Projeto independente, não afiliado à Mattel."],
"Estimativas informativas · v1.0.0":["Indicative estimates · v1.0.0","Estimaciones orientativas · v1.0.0","Estimations indicatives · v1.0.0","Unverbindliche Schätzungen · v1.0.0","Stime indicative · v1.0.0","Indicatieve schattingen · v1.0.0","Estimativas informativas · v1.0.0"],
"Exemplos: '69 Camaro, Nissan Skyline, Treasure Hunt, STH, HBK55...":["Examples: '69 Camaro, Nissan Skyline, Treasure Hunt, STH, HBK55...","Ejemplos: '69 Camaro, Nissan Skyline, Treasure Hunt, STH, HBK55...","Exemples : '69 Camaro, Nissan Skyline, Treasure Hunt, STH, HBK55...","Beispiele: '69 Camaro, Nissan Skyline, Treasure Hunt, STH, HBK55...","Esempi: '69 Camaro, Nissan Skyline, Treasure Hunt, STH, HBK55...","Voorbeelden: '69 Camaro, Nissan Skyline, Treasure Hunt, STH, HBK55...","Exemplos: '69 Camaro, Nissan Skyline, Treasure Hunt, STH, HBK55..."],
"Categoria":["Category","Categoría","Catégorie","Kategorie","Categoria","Categorie","Categoria"],
"Ferrari...":["Ferrari...","Ferrari...","Ferrari...","Ferrari...","Ferrari...","Ferrari...","Ferrari..."],
"PARA COLECIONADORES":["FOR COLLECTORS","PARA COLECCIONISTAS","POUR LES COLLECTIONNEURS","FÜR SAMMLER","PER COLLEZIONISTI","VOOR VERZAMELAARS","PARA COLECIONADORES"],
"Mais do que uma lista de carrinhos.":["More than a list of toy cars.","Mucho más que una lista de coches.","Bien plus qu’une liste de petites voitures.","Mehr als nur eine Liste von Spielzeugautos.","Più di un semplice elenco di automobiline.","Meer dan een lijst met speelgoedauto's.","Mais do que uma lista de carrinhos."],
"Identificar modelos":["Identify models","Identificar modelos","Identifier les modèles","Modelle identifizieren","Identificare i modelli","Modellen identificeren","Identificar modelos"],
"Compara referências, séries e detalhes visuais antes de classificar uma miniatura.":["Compare references, series and visual details before classifying a miniature.","Compara referencias, series y detalles visuales antes de clasificar una miniatura.","Compare les références, les séries et les détails visuels avant de classer une miniature.","Vergleiche Referenzen, Serien und visuelle Details, bevor du ein Modell einordnest.","Confronta riferimenti, serie e dettagli visivi prima di classificare una miniatura.","Vergelijk referenties, series en visuele details voordat je een miniatuur classificeert.","Compara referências, séries e detalhes visuais antes de classificar uma miniatura."],
"Confirmar TH e STH":["Verify TH and STH","Confirmar TH y STH","Vérifier les TH et STH","TH und STH überprüfen","Verificare TH e STH","TH en STH controleren","Confirmar TH e STH"],
"Procura sinais visíveis e distingue uma suspeita de uma confirmação sustentada por evidências.":["Look for visible signs and distinguish a suspicion from an evidence-based confirmation.","Busca señales visibles y distingue una sospecha de una confirmación respaldada por pruebas.","Repère les signes visibles et distingue un soupçon d’une confirmation étayée par des preuves.","Achte auf sichtbare Merkmale und unterscheide einen Verdacht von einer belegten Bestätigung.","Cerca i segni visibili e distingui un sospetto da una conferma supportata da prove.","Zoek naar zichtbare kenmerken en maak onderscheid tussen een vermoeden en een bevestiging met bewijs.","Procura sinais visíveis e distingue uma suspeita de uma confirmação sustentada por evidências."],
"Avaliar oportunidades":["Assess opportunities","Evaluar oportunidades","Évaluer les opportunités","Angebote bewerten","Valutare le opportunità","Kansen beoordelen","Avaliar oportunidades"],
"Considera o custo total, o estado do blister e vendas concluídas comparáveis.":["Consider the total cost, blister condition and comparable completed sales.","Ten en cuenta el coste total, el estado del blíster y las ventas completadas comparables.","Prends en compte le coût total, l’état du blister et les ventes conclues comparables.","Berücksichtige die Gesamtkosten, den Zustand der Blisterverpackung und vergleichbare abgeschlossene Verkäufe.","Considera il costo totale, le condizioni del blister e le vendite concluse comparabili.","Houd rekening met de totale kosten, de staat van de blisterverpakking en vergelijkbare afgeronde verkopen.","Considera o custo total, o estado do blister e vendas concluídas comparáveis."],
"ARQUIVO DE COLECIONADOR":["COLLECTOR ARCHIVE","ARCHIVO DEL COLECCIONISTA","ARCHIVES DU COLLECTIONNEUR","SAMMLERARCHIV","ARCHIVIO DEL COLLEZIONISTA","VERZAMELAARARCHIEF","ARQUIVO DE COLECIONADOR"],
"Experimenta grátis!":["Try it for free!","¡Pruébalo gratis!","Essayez gratuitement !","Kostenlos ausprobieren!","Provalo gratis!","Probeer het gratis!","Experimenta grátis!"],
"Com conta gratuita:":["With a free account:","Con una cuenta gratuita:","Avec un compte gratuit :","Mit kostenlosem Konto:","Con un account gratuito:","Met een gratis account:","Com conta gratuita:"],
"10 pesquisas por dia":["10 searches per day","10 búsquedas al día","10 recherches par jour","10 Suchen pro Tag","10 ricerche al giorno","10 zoekopdrachten per dag","10 pesquisas por dia"],
"Em breve: Plano Pro":["Coming soon: Pro Plan","Próximamente: Plan Pro","Bientôt : formule Pro","Demnächst: Pro-Tarif","Presto: Piano Pro","Binnenkort: Pro-abonnement","Em breve: Plano Pro"],
"Mais pesquisas, histórico e funcionalidades exclusivas.":["More searches, history and exclusive features.","Más búsquedas, historial y funciones exclusivas.","Plus de recherches, un historique et des fonctionnalités exclusives.","Mehr Suchen, Verlauf und exklusive Funktionen.","Più ricerche, cronologia e funzionalità esclusive.","Meer zoekopdrachten, geschiedenis en exclusieve functies.","Mais pesquisas, histórico e funcionalidades exclusivas."],
"Recebe novidades":["Get updates","Recibe novedades","Recevoir les actualités","Neuigkeiten erhalten","Ricevi aggiornamenti","Ontvang updates","Recebe novidades"],
"Dicas, novos recursos e atualizações do HW Price Check.":["Tips, new features and HW Price Check updates.","Consejos, nuevas funciones y actualizaciones de HW Price Check.","Conseils, nouvelles fonctionnalités et actualités de HW Price Check.","Tipps, neue Funktionen und Updates zu HW Price Check.","Consigli, nuove funzioni e aggiornamenti di HW Price Check.","Tips, nieuwe functies en updates van HW Price Check.","Dicas, novos recursos e atualizações do HW Price Check."],
"Subscrever":["Subscribe","Suscribirse","S’abonner","Abonnieren","Iscriviti","Abonneren","Subscrever"],
"O teu email fica registado para futuras novidades. O envio de campanhas ainda não está ativo.":["Your email is saved for future updates. Campaign emails are not active yet.","Tu correo queda registrado para futuras novedades. El envío de campañas aún no está activo.","Ton adresse e-mail est enregistrée pour les prochaines actualités. L’envoi de campagnes n’est pas encore actif.","Deine E-Mail-Adresse wird für zukünftige Neuigkeiten gespeichert. Kampagnen-E-Mails sind noch nicht aktiviert.","La tua email viene registrata per futuri aggiornamenti. L’invio delle campagne non è ancora attivo.","Je e-mailadres wordt bewaard voor toekomstige updates. Campagne-e-mails zijn nog niet actief.","O teu email fica registado para futuras novidades. O envio de campanhas ainda não está ativo."],
"Ferramenta independente para colecionadores de carros à escala.":["An independent tool for scale-model car collectors.","Una herramienta independiente para coleccionistas de coches a escala.","Un outil indépendant pour les collectionneurs de voitures miniatures.","Ein unabhängiges Tool für Sammler von Modellautos.","Uno strumento indipendente per collezionisti di auto in scala.","Een onafhankelijke tool voor verzamelaars van schaalmodelauto's.","Ferramenta independente para colecionadores de carros à escala."],
"Não afiliada, patrocinada ou aprovada pela Mattel.":["Not affiliated with, sponsored or endorsed by Mattel.","No afiliada, patrocinada ni aprobada por Mattel.","Non affilié, sponsorisé ni approuvé par Mattel.","Nicht mit Mattel verbunden, von Mattel gesponsert oder genehmigt.","Non affiliato, sponsorizzato o approvato da Mattel.","Niet verbonden met, gesponsord of goedgekeurd door Mattel.","Não afiliada, patrocinada ou aprovada pela Mattel."],
"Navegação":["Navigation","Navegación","Navigation","Navigation","Navigazione","Navigatie","Navegação"],
"Ajuda":["Help","Ayuda","Aide","Hilfe","Aiuto","Help","Ajuda"],
"Perguntas Frequentes (FAQ)":["Frequently Asked Questions (FAQ)","Preguntas frecuentes (FAQ)","Foire aux questions (FAQ)","Häufig gestellte Fragen (FAQ)","Domande frequenti (FAQ)","Veelgestelde vragen (FAQ)","Perguntas Frequentes (FAQ)"],
"Como Funciona":["How It Works","Cómo funciona","Comment ça marche","So funktioniert es","Come funziona","Hoe het werkt","Como Funciona"],
"Planos e Limites":["Plans & Limits","Planes y límites","Offres et limites","Tarife und Limits","Piani e limiti","Abonnementen en limieten","Planos e Limites"],
"Contactar Suporte":["Contact Support","Contactar con soporte","Contacter l’assistance","Support kontaktieren","Contatta il supporto","Contact opnemen met support","Contactar Suporte"],
"Quem Somos":["Who We Are","Quiénes somos","Qui sommes-nous","Wer wir sind","Chi siamo","Over ons","Quem Somos"],
"Termos de Utilização":["Terms of Use","Términos de uso","Conditions d’utilisation","Nutzungsbedingungen","Termini di utilizzo","Gebruiksvoorwaarden","Termos de Utilização"],
"Política de Privacidade":["Privacy Policy","Política de privacidad","Politique de confidentialité","Datenschutzerklärung","Informativa sulla privacy","Privacybeleid","Política de Privacidade"],
"Política de Cookies":["Cookie Policy","Política de cookies","Politique relative aux cookies","Cookie-Richtlinie","Informativa sui cookie","Cookiebeleid","Política de Cookies"],
"Pesquisa um modelo Hot Wheels...":["Search for a Hot Wheels model...","Busca un modelo Hot Wheels...","Rechercher un modèle Hot Wheels...","Nach einem Hot-Wheels-Modell suchen...","Cerca un modello Hot Wheels...","Zoek een Hot Wheels-model...","Pesquise um modelo Hot Wheels..."],
"Pesquisar por fotografia":["Search by photo","Buscar por foto","Rechercher par photo","Nach Foto suchen","Cerca per foto","Zoeken op foto","Pesquisar por foto"],
"Adicionar fotografias":["Add photos","Añadir fotos","Ajouter des photos","Fotos hinzufügen","Aggiungi foto","Foto's toevoegen","Adicionar fotos"],
"Alternar tema":["Toggle theme","Cambiar tema","Changer de thème","Design wechseln","Cambia tema","Thema wisselen","Alternar tema"],
"Como te devemos chamar?":["What should we call you?","¿Cómo debemos llamarte?","Comment devons-nous t’appeler ?","Wie sollen wir dich nennen?","Come dobbiamo chiamarti?","Hoe mogen we je noemen?","Como devemos chamar você?"],
"Novo endereço de email":["New email address","Nueva dirección de correo","Nouvelle adresse e-mail","Neue E-Mail-Adresse","Nuovo indirizzo email","Nieuw e-mailadres","Novo endereço de email"],
"Mínimo de 8 caracteres":["At least 8 characters","Mínimo de 8 caracteres","8 caractères minimum","Mindestens 8 Zeichen","Almeno 8 caratteri","Minimaal 8 tekens","Mínimo de 8 caracteres"],
"Repete a nova palavra-passe":["Re-enter the new password","Repite la nueva contraseña","Saisis à nouveau le nouveau mot de passe","Neues Passwort wiederholen","Ripeti la nuova password","Herhaal het nieuwe wachtwoord","Repita a nova senha"],
"O teu email":["Your email","Tu correo electrónico","Ton adresse e-mail","Deine E-Mail-Adresse","La tua email","Je e-mailadres","Seu email"],
"Indica o modelo e um preço pedido válido.":["Enter the model and a valid asking price.","Indica el modelo y un precio solicitado válido.","Indique le modèle et un prix demandé valide.","Gib das Modell und einen gültigen Angebotspreis ein.","Inserisci il modello e un prezzo richiesto valido.","Vul het model en een geldige vraagprijs in.","Informe o modelo e um preço anunciado válido."],
"Confirma os portes e o intervalo de revenda. O máximo deve ser igual ou superior ao mínimo.":["Check shipping and the resale range. The maximum must be at least the minimum.","Comprueba el envío y el intervalo de reventa. El máximo debe ser igual o superior al mínimo.","Vérifie les frais de livraison et la fourchette de revente. Le maximum doit être supérieur ou égal au minimum.","Prüfe Versandkosten und Wiederverkaufsspanne. Der Höchstwert muss mindestens dem Mindestwert entsprechen.","Verifica spedizione e intervallo di rivendita. Il massimo deve essere uguale o superiore al minimo.","Controleer de verzendkosten en de doorverkoopmarge. Het maximum moet minstens gelijk zijn aan het minimum.","Confirme o frete e o intervalo de revenda. O máximo deve ser igual ou superior ao mínimo."],
"O número de vendas comparáveis não é válido.":["The number of comparable sales is invalid.","El número de ventas comparables no es válido.","Le nombre de ventes comparables n’est pas valide.","Die Anzahl vergleichbarer Verkäufe ist ungültig.","Il numero di vendite comparabili non è valido.","Het aantal vergelijkbare verkopen is ongeldig.","O número de vendas comparáveis não é válido."],
"Tira ou escolhe pelo menos uma fotografia.":["Take or choose at least one photo.","Haz o selecciona al menos una foto.","Prends ou sélectionne au moins une photo.","Nimm mindestens ein Foto auf oder wähle eines aus.","Scatta o seleziona almeno una foto.","Maak of selecteer minstens één foto.","Tire ou selecione pelo menos uma foto."],
"A analisar fotografias com Gemini…":["Analysing photos with Gemini…","Analizando fotos con Gemini…","Analyse des photos avec Gemini…","Fotos werden mit Gemini analysiert…","Analisi delle foto con Gemini…","Foto’s analyseren met Gemini…","Analisando fotos com Gemini…"],
"Indica primeiro o modelo.":["Enter the model first.","Indica primero el modelo.","Indique d’abord le modèle.","Gib zuerst das Modell ein.","Inserisci prima il modello.","Vul eerst het model in.","Informe primeiro o modelo."],
"O serviço de conta não carregou. Atualiza a página e tenta novamente.":["The account service did not load. Refresh the page and try again.","No se ha cargado el servicio de cuenta. Actualiza la página e inténtalo de nuevo.","Le service de compte n’a pas chargé. Actualise la page et réessaie.","Der Kontodienst wurde nicht geladen. Aktualisiere die Seite und versuche es erneut.","Il servizio account non è stato caricato. Aggiorna la pagina e riprova.","De accountservice is niet geladen. Vernieuw de pagina en probeer het opnieuw.","O serviço da conta não carregou. Atualize a página e tente novamente."],
"As 3 pesquisas gratuitas terminaram":["Your 3 free searches have ended","Has agotado las 3 búsquedas gratuitas","Tes 3 recherches gratuites sont terminées","Deine 3 kostenlosen Suchen sind aufgebraucht","Le 3 ricerche gratuite sono terminate","Je 3 gratis zoekopdrachten zijn op","As 3 pesquisas gratuitas terminaram"],
"Cria uma conta ou inicia sessão para continuar.":["Create an account or log in to continue.","Crea una cuenta o inicia sesión para continuar.","Crée un compte ou connecte-toi pour continuer.","Erstelle ein Konto oder melde dich an, um fortzufahren.","Crea un account o accedi per continuare.","Maak een account aan of log in om door te gaan.","Crie uma conta ou entre para continuar."],
"Modelo preenchido. Adiciona fotografias para o identificar.":["Model filled in. Add photos to identify it.","Modelo completado. Añade fotos para identificarlo.","Modèle renseigné. Ajoute des photos pour l’identifier.","Modell eingetragen. Füge Fotos hinzu, um es zu identifizieren.","Modello inserito. Aggiungi foto per identificarlo.","Model ingevuld. Voeg foto’s toe om het te herkennen.","Modelo preenchido. Adicione fotos para identificá-lo."],
"Fotografia carregada. Adiciona outras vistas e carrega em “Identificar com Gemini”.":["Photo uploaded. Add other views and click “Identify with Gemini”.","Foto cargada. Añade otras vistas y pulsa «Identificar con Gemini».","Photo chargée. Ajoute d’autres vues et clique sur « Identifier avec Gemini ».","Foto hochgeladen. Füge weitere Ansichten hinzu und klicke auf „Mit Gemini identifizieren“.","Foto caricata. Aggiungi altre viste e premi “Identifica con Gemini”.","Foto geüpload. Voeg andere aanzichten toe en klik op ‘Identificeren met Gemini’.","Foto carregada. Adicione outras vistas e clique em “Identificar com Gemini”."],
"Indica um endereço de email válido.":["Enter a valid email address.","Indica una dirección de correo válida.","Saisis une adresse e-mail valide.","Gib eine gültige E-Mail-Adresse ein.","Inserisci un indirizzo email valido.","Voer een geldig e-mailadres in.","Informe um endereço de email válido."],
"Serviço indisponível. Tenta novamente mais tarde.":["Service unavailable. Try again later.","Servicio no disponible. Inténtalo de nuevo más tarde.","Service indisponible. Réessaie plus tard.","Dienst nicht verfügbar. Versuche es später erneut.","Servizio non disponibile. Riprova più tardi.","Service niet beschikbaar. Probeer het later opnieuw.","Serviço indisponível. Tente novamente mais tarde."],
"Este email já está inscrito.":["This email is already subscribed.","Este correo ya está suscrito.","Cette adresse e-mail est déjà inscrite.","Diese E-Mail ist bereits angemeldet.","Questa email è già iscritta.","Dit e-mailadres is al ingeschreven.","Este email já está inscrito."],
"Registo concluído. Obrigado!":["Subscription complete. Thank you!","Registro completado. ¡Gracias!","Inscription terminée. Merci !","Anmeldung abgeschlossen. Vielen Dank!","Iscrizione completata. Grazie!","Inschrijving voltooid. Bedankt!","Cadastro concluído. Obrigado!"],
"Não foi possível concluir a subscrição. Tenta novamente.":["Could not complete the subscription. Try again.","No se pudo completar la suscripción. Inténtalo de nuevo.","Impossible de terminer l’inscription. Réessaie.","Das Abonnement konnte nicht abgeschlossen werden. Versuche es erneut.","Impossibile completare l’iscrizione. Riprova.","De inschrijving kon niet worden voltooid. Probeer het opnieuw.","Não foi possível concluir a inscrição. Tente novamente."],
"A subscrever…":["Subscribing…","Suscribiendo…","Inscription en cours…","Anmeldung läuft…","Iscrizione in corso…","Bezig met inschrijven…","Inscrevendo…"],
"Subscrever":["Subscribe","Suscribirse","S’inscrire","Abonnieren","Iscriviti","Inschrijven","Inscrever-se"],
"O pagamento foi cancelado. Não foi criada nenhuma subscrição.":["Payment was cancelled. No subscription was created.","El pago se canceló. No se creó ninguna suscripción.","Le paiement a été annulé. Aucun abonnement n’a été créé.","Die Zahlung wurde abgebrochen. Es wurde kein Abonnement erstellt.","Il pagamento è stato annullato. Non è stato creato alcun abbonamento.","De betaling is geannuleerd. Er is geen abonnement aangemaakt.","O pagamento foi cancelado. Nenhuma assinatura foi criada."],
"Queres terminar a sessão do HW Price Check neste dispositivo?":["Do you want to sign out of HW Price Check on this device?","¿Quieres cerrar la sesión de HW Price Check en este dispositivo?","Veux-tu te déconnecter de HW Price Check sur cet appareil ?","Möchtest du dich auf diesem Gerät von HW Price Check abmelden?","Vuoi uscire da HW Price Check su questo dispositivo?","Wil je je afmelden bij HW Price Check op dit apparaat?","Deseja sair do HW Price Check neste dispositivo?"],
"Visitantes: indisponível":["Visitors: unavailable","Visitantes: no disponible","Visiteurs : indisponible","Besucher: nicht verfügbar","Visitatori: non disponibile","Bezoekers: niet beschikbaar","Visitantes: indisponível"],
"Menu da conta":["Account menu","Menú de la cuenta","Menu du compte","Kontomenü","Menu account","Accountmenu","Menu da conta"],
"Visão geral":["Overview","Resumen","Vue d’ensemble","Übersicht","Panoramica","Overzicht","Visão geral"],
"Perfil":["Profile","Perfil","Profil","Profil","Profilo","Profiel","Perfil"],
"Segurança":["Security","Seguridad","Sécurité","Sicherheit","Sicurezza","Beveiliging","Segurança"],
"Preferências":["Preferences","Preferencias","Préférences","Einstellungen","Preferenze","Voorkeuren","Preferências"],
"Atividade":["Activity","Actividad","Activité","Aktivität","Attività","Activiteit","Atividade"],
"Terminar sessão":["Sign out","Cerrar sesión","Se déconnecter","Abmelden","Esci","Uitloggen","Sair"],
"O TEU PAINEL":["YOUR DASHBOARD","TU PANEL","TON TABLEAU DE BORD","DEIN DASHBOARD","IL TUO PANNELLO","JOUW DASHBOARD","SEU PAINEL"],
"Estado da garagem":["Garage overview","Estado del garaje","État du garage","Garagenstatus","Stato del garage","Garagestatus","Estado da garagem"],
"Um resumo rápido da tua conta e atividade de colecionador.":["A quick summary of your account and collector activity.","Un resumen rápido de tu cuenta y actividad como coleccionista.","Un aperçu de ton compte et de ton activité de collectionneur.","Eine kurze Übersicht über dein Konto und deine Sammleraktivität.","Un riepilogo del tuo account e della tua attività da collezionista.","Een kort overzicht van je account en verzamelactiviteit.","Um resumo rápido da sua conta e atividade de colecionador."],
"CONTA ATIVA":["ACTIVE ACCOUNT","CUENTA ACTIVA","COMPTE ACTIF","AKTIVES KONTO","ACCOUNT ATTIVO","ACTIEF ACCOUNT","CONTA ATIVA"],
"Plano atual":["Current plan","Plan actual","Offre actuelle","Aktueller Tarif","Piano attuale","Huidig abonnement","Plano atual"],
"Pesquisas diárias":["Daily searches","Búsquedas diarias","Recherches quotidiennes","Tägliche Suchen","Ricerche giornaliere","Dagelijkse zoekopdrachten","Pesquisas diárias"],
"Na tua garagem":["In your garage","En tu garaje","Dans ton garage","In deiner Garage","Nel tuo garage","In je garage","Na sua garagem"],
"Dados da conta":["Account details","Datos de la cuenta","Données du compte","Kontodaten","Dati account","Accountgegevens","Dados da conta"],
"Nome de perfil":["Profile name","Nombre de perfil","Nom du profil","Profilname","Nome profilo","Profielnaam","Nome do perfil"],
"Membro desde":["Member since","Miembro desde","Membre depuis","Mitglied seit","Membro dal","Lid sinds","Membro desde"],
"Estado do email":["Email status","Estado del correo","État de l’e-mail","E-Mail-Status","Stato email","E-mailstatus","Estado do email"],
"Editar perfil":["Edit profile","Editar perfil","Modifier le profil","Profil bearbeiten","Modifica profilo","Profiel bewerken","Editar perfil"],
"Atividade recente":["Recent activity","Actividad reciente","Activité récente","Letzte Aktivität","Attività recente","Recente activiteit","Atividade recente"],
"Ainda não há atividade guardada.":["No saved activity yet.","Todavía no hay actividad guardada.","Aucune activité enregistrée pour le moment.","Noch keine Aktivität gespeichert.","Nessuna attività salvata.","Nog geen activiteit opgeslagen.","Ainda não há atividade guardada."],
"Ver atividade completa":["View all activity","Ver toda la actividad","Voir toute l’activité","Alle Aktivitäten anzeigen","Vedi tutte le attività","Alle activiteit bekijken","Ver toda a atividade"],
"Informação pessoal":["Personal information","Información personal","Informations personnelles","Persönliche Informationen","Informazioni personali","Persoonlijke informatie","Informações pessoais"],
"Atualiza o nome apresentado na tua área pessoal.":["Update the name shown in your account area.","Actualiza el nombre que aparece en tu área personal.","Mets à jour le nom affiché dans ton espace personnel.","Aktualisiere den Namen in deinem persönlichen Bereich.","Aggiorna il nome visualizzato nella tua area personale.","Werk de naam bij die in je account wordt weergegeven.","Atualize o nome exibido na sua área pessoal."],
"Email atual":["Current email","Correo actual","E-mail actuel","Aktuelle E-Mail","Email attuale","Huidig e-mailadres","Email atual"],
"Alterar endereço de email":["Change email address","Cambiar dirección de correo","Changer l’adresse e-mail","E-Mail-Adresse ändern","Cambia indirizzo email","E-mailadres wijzigen","Alterar endereço de email"],
"Enviar pedido de alteração":["Submit change request","Enviar solicitud de cambio","Envoyer la demande de modification","Änderungsanfrage senden","Invia richiesta di modifica","Wijzigingsverzoek verzenden","Enviar pedido de alteração"],
"Alterar palavra-passe":["Change password","Cambiar contraseña","Changer le mot de passe","Passwort ändern","Cambia password","Wachtwoord wijzigen","Alterar palavra-passe"],
"Sessão atual":["Current session","Sesión actual","Session actuelle","Aktuelle Sitzung","Sessione attuale","Huidige sessie","Sessão atual"],
"Conta autenticada":["Authenticated account","Cuenta autenticada","Compte authentifié","Authentifiziertes Konto","Account autenticato","Geauthenticeerd account","Conta autenticada"],
"Email confirmado":["Email confirmed","Correo confirmado","E-mail confirmé","E-Mail bestätigt","Email confermata","E-mail bevestigd","Email confirmado"],
"IDENTIDADE DO PILOTO":["DRIVER IDENTITY","IDENTIDAD DEL PILOTO","IDENTITÉ DU PILOTE","FAHRERIDENTITÄT","IDENTITÀ DEL PILOTA","COUREURIDENTITEIT","IDENTIDADE DO PILOTO"],
"PROTEÇÃO DA CONTA":["ACCOUNT PROTECTION","PROTECCIÓN DE LA CUENTA","PROTECTION DU COMPTE","KONTOSCHUTZ","PROTEZIONE ACCOUNT","ACCOUNTBEVEILIGING","PROTEÇÃO DA CONTA"],
"AFINA A TUA EXPERIÊNCIA":["CUSTOMISE YOUR EXPERIENCE","PERSONALIZA TU EXPERIENCIA","PERSONNALISE TON EXPÉRIENCE","PASSE DEIN ERLEBNIS AN","PERSONALIZZA LA TUA ESPERIENZA","PAS JE ERVARING AAN","PERSONALIZE SUA EXPERIÊNCIA"],
"Idioma e aparência":["Language and appearance","Idioma y apariencia","Langue et apparence","Sprache und Darstellung","Lingua e aspetto","Taal en weergave","Idioma e aparência"],
"Personaliza a apresentação do HW Price Check.":["Customise how HW Price Check looks.","Personaliza la apariencia de HW Price Check.","Personnalise l’apparence de HW Price Check.","Passe das Erscheinungsbild von HW Price Check an.","Personalizza l’aspetto di HW Price Check.","Pas het uiterlijk van HW Price Check aan.","Personalize a aparência do HW Price Check."],
"Idioma da aplicação":["App language","Idioma de la aplicación","Langue de l’application","App-Sprache","Lingua dell’app","App-taal","Idioma do aplicativo"],
"Aparência":["Appearance","Apariencia","Apparence","Darstellung","Aspetto","Weergave","Aparência"],
"Guardar preferências":["Save preferences","Guardar preferencias","Enregistrer les préférences","Einstellungen speichern","Salva preferenze","Voorkeuren opslaan","Salvar preferências"],
"Arquivo Treasure Hunt":["Treasure Hunt archive","Archivo Treasure Hunt","Archives Treasure Hunt","Treasure-Hunt-Archiv","Archivio Treasure Hunt","Treasure Hunt-archief","Arquivo Treasure Hunt"],
"GUIAS DE COLECIONADOR":["COLLECTOR GUIDES","GUÍAS PARA COLECCIONISTAS","GUIDES DU COLLECTIONNEUR","SAMMLERGUIDES","GUIDE PER COLLEZIONISTI","VERZAMELAARSGIDSEN","GUIAS DE COLECIONADOR"],
"Pesquisar modelo":["Search model","Buscar modelo","Rechercher un modèle","Modell suchen","Cerca modello","Zoek model","Pesquisar modelo"],
"Ordem da série":["Series order","Orden de la serie","Ordre de la série","Reihenfolge der Serie","Ordine della serie","Volgorde van de serie","Ordem da série"],
"Não foram encontrados modelos com estes filtros.":["No models found with these filters.","No se encontraron modelos con estos filtros.","Aucun modèle trouvé avec ces filtres.","Keine Modelle mit diesen Filtern gefunden.","Nessun modello trovato con questi filtri.","Geen modellen gevonden met deze filters.","Nenhum modelo encontrado com estes filtros."],
"Ver ficha":["View details","Ver ficha","Voir la fiche","Details ansehen","Visualizza scheda","Bekijk details","Ver ficha"],
"Ver fotos":["View photos","Ver fotos","Voir les photos","Fotos ansehen","Vedi foto","Bekijk foto's","Ver fotos"],
"Estimativa de mercado":["Market estimate","Estimación de mercado","Estimation du marché","Marktschätzung","Stima di mercato","Marktschatting","Estimativa de mercado"],
"Sem estimativa individual fiável":["No reliable individual estimate","Sin estimación individual fiable","Aucune estimation individuelle fiable","Keine verlässliche Einzelschätzung","Nessuna stima individuale affidabile","Geen betrouwbare individuele schatting","Sem estimativa individual fiável"],
"Consultar vendas concluídas":["Check completed sales","Consultar ventas cerradas","Consulter les ventes conclues","Abgeschlossene Verkäufe prüfen","Consulta vendite concluse","Afgeronde verkopen bekijken","Consultar vendas concluídas"],
"Ano":["Year","Año","Année","Jahr","Anno","Jaar","Ano"],
"A procurar vendas concluídas para":["Searching completed sales for","Buscando ventas cerradas de","Recherche des ventes conclues pour","Suche abgeschlossene Verkäufe für","Ricerca vendite concluse per","Zoeken naar afgeronde verkopen voor","Buscando vendas concluídas para"],
};
const idx={en:0,es:1,fr:2,de:3,it:4,nl:5,br:6};
const originals=new WeakMap(),attrs=new WeakMap();
const languageSelect=document.getElementById('language');
const validLanguages=['pt','en','es','fr','de','it','nl','br'];
const savedLanguage=()=>{try{return localStorage.getItem('hwpc-language')||localStorage.getItem('hwpc_lang')||'pt'}catch(_){return 'pt'}};
const lang=()=>languageSelect?.value||savedLanguage();
if(languageSelect){const saved=savedLanguage();if(validLanguages.includes(saved))languageSelect.value=saved;}
const dictionaryKeys=Object.keys(D).sort((a,b)=>b.length-a.length);
const translateValue=(raw,L,col)=>{
 if(L==='pt')return raw;
 const trimmed=raw.trim();if(!trimmed)return raw;
 const exact=D[trimmed];if(exact)return raw.replace(trimmed,exact[col]||exact[0]);
 let result=raw;
 for(const key of dictionaryKeys){
  if(!key||!result.includes(key))continue;
  const value=D[key][col]||D[key][0];
  result=result.split(key).join(value);
 }
 return result;
};
const protectedContent='[data-no-translate], [contenteditable="true"], .catalog-grid, .catalog-detail-layout, .catalog-detail-art, .catalog-thumb, .collection-items, .watch-items, .item, .stat, .decision, .photos, .photo, .thumb, .search-results';
const isProtectedNode=node=>!!node?.parentElement?.closest(protectedContent);
const translateText=()=>{
 const L=lang(),col=idx[L];
 let cachedTranslations={};
 try{cachedTranslations=JSON.parse(localStorage.getItem('hwpc-mymemory-cache-v1')||'{}')}catch(_){}
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 let n;while((n=walker.nextNode())){
  if(isProtectedNode(n))continue;
  if(!originals.has(n))originals.set(n,n.nodeValue);
  const raw=originals.get(n),known=translateValue(raw,L,col);
  const translated=known!==raw?known:(cachedTranslations[L+'|'+raw]||raw);
  if(n.nodeValue!==translated)n.nodeValue=translated;
 }
 document.querySelectorAll('[placeholder],[aria-label],[title]').forEach(el=>{
  if(el.closest(protectedContent))return;
  let saved=attrs.get(el);if(!saved){saved={};attrs.set(el,saved)}
  ['placeholder','aria-label','title'].forEach(attr=>{
   const current=el.getAttribute(attr);
   if(!(attr in saved)&&current!==null)saved[attr]=current;
   const original=saved[attr];
   if(original!==undefined&&original!==null){
    // Only translate known UI labels in attributes. Never machine-translate
    // model examples, email hints, or user-entered values.
    const translated=translateValue(original,L,col);
    if(current!==translated)el.setAttribute(attr,translated);
   }
  });
 });
 document.documentElement.lang=({pt:'pt-PT',br:'pt-BR',en:'en',es:'es',fr:'fr',de:'de',it:'it',nl:'nl'})[L]||'pt-PT';
 try{localStorage.setItem('hwpc-language',L);localStorage.setItem('hwpc_lang',L)}catch(_){}
 // MyMemory: tradução automática de fallback para textos ainda não existentes no dicionário.
 const mmCacheKey='hwpc-mymemory-cache-v1';
 const mmUsageKey='hwpc-mymemory-usage-v1';
 const mmTarget={en:'en',es:'es',fr:'fr',de:'de',it:'it',nl:'nl',br:'pt-BR'};
 const mmInflight=new Map();
 const mmCache=()=>{try{return JSON.parse(localStorage.getItem(mmCacheKey)||'{}')}catch(_){return {}}};
 const mmStore=(key,value)=>{try{const c=mmCache();c[key]=value;localStorage.setItem(mmCacheKey,JSON.stringify(c))}catch(_){}};
 const mmDay=()=>new Date().toISOString().slice(0,10);
 const mmUsed=()=>{try{const v=JSON.parse(localStorage.getItem(mmUsageKey)||'{}');return v.day===mmDay()?Number(v.chars)||0:0}catch(_){return 0}};
 const mmAddUsage=n=>{try{localStorage.setItem(mmUsageKey,JSON.stringify({day:mmDay(),chars:mmUsed()+n}))}catch(_){}};
 const mmTranslate=async(raw,L)=>{
  const target=mmTarget[L];if(!target||!raw||new TextEncoder().encode(raw).length>500)return null;
  const key=L+'|'+raw;const cached=mmCache()[key];if(cached)return cached;
  if(mmInflight.has(key))return mmInflight.get(key);
  const promise=(async()=>{
   const used=mmUsed(),size=raw.length;
   if(used+size>4500)return null;
   const p=new URLSearchParams({q:raw,langpair:'pt|'+target});
   const response=await fetch('https://api.mymemory.translated.net/get?'+p.toString());
   if(!response.ok)throw new Error('MyMemory HTTP '+response.status);
   const data=await response.json();
   if(Number(data.responseStatus)!==200)throw new Error(data.responseDetails||'MyMemory indisponível');
   const translated=String(data.responseData?.translatedText||'').trim();
   if(!translated||translated.toLowerCase()===raw.trim().toLowerCase())return null;
   mmStore(key,translated);mmAddUsage(size);return translated;
  })().finally(()=>mmInflight.delete(key));
  mmInflight.set(key,promise);return promise;
 };
 let mmScheduled=false;
 const translateUnknown=()=>{
  const L=lang();if(L==='pt')return;
  if(mmScheduled)return;mmScheduled=true;
  setTimeout(async()=>{
   mmScheduled=false;
   const active=lang(),col=idx[active];if(!col)return;
   const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
   const nodes=[];let node;
   while((node=walker.nextNode())){
    const parent=node.parentElement,tag=parent?.tagName;
    if(!parent||/^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|PRE|CODE|OPTION|INPUT|SELECT)$/.test(tag)||isProtectedNode(node))continue;
    const raw=originals.get(node);if(!raw||raw.trim().length<2||raw.trim().length>450)continue;
    if(translateValue(raw,active,col)!==raw)continue;
    if(node.nodeValue!==raw&&node.nodeValue!==translateValue(raw,active,col))continue;
    nodes.push({node,raw});
   }
   for(const item of nodes){
    if(lang()!==active)break;
    const cached=mmCache()[active+'|'+item.raw];
    if(cached){if(item.node.isConnected&&originals.get(item.node)===item.raw)item.node.nodeValue=cached;continue;}
    try{
     const translated=await mmTranslate(item.raw,active);
     if(translated&&lang()===active&&item.node.isConnected&&originals.get(item.node)===item.raw)item.node.nodeValue=translated;
    }catch(error){console.warn('[HWPC] MyMemory:',error.message);break;}
    await new Promise(resolve=>setTimeout(resolve,180));
   }
  },80);
 };
 translateUnknown();
};
let queued=false;const run=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;translateText()})};
languageSelect?.addEventListener('change',()=>{try{localStorage.setItem('hwpc-language',languageSelect.value)}catch(_){};run()});
new MutationObserver(run).observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['placeholder','aria-label','title']});
document.addEventListener('DOMContentLoaded',run);setTimeout(run,0);
})();
