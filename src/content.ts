/**
 * Every word on the site. Facts (dates, contact details, services, rental
 * rules, the testimonial, named past setups) come from the Wedding Party's
 * own previous website and Google Business listing. Nothing here is a number
 * the business hasn't published itself.
 */

import {withBase} from './lib/base';

const photo = (name: string) => withBase(`/media/photos/${name}.webp`);

export const brand = {
  name: 'The Wedding Party Group',
  short: 'Wedding Party',
  statement: 'Pretoria’s full-service wedding & event specialists',
  established: 2000,
  /** Kept as the emotional line, not the explanation of the business. */
  slogan: 'Where clients become life-long friends',
  tagline: 'Sophisticated. Perfection. Elegance.',
  url: 'https://weddingparty.co.za',
};

export const contact = {
  whatsapp: '27826858885',
  whatsappLabel: '082 685 8885',
  phone: '+27826858885',
  phoneLabel: '082 685 8885',
  phoneAlt: '+27605679819',
  phoneAltLabel: '060 567 9819',
  email: 'info@weddingparty.co.za',
  hours: '08:00 – 17:00',
  address: ['Selati Street, 158 Maria Bronkhorst Rd', 'Ashlea Gardens, Pretoria, 0081'],
  maps: 'https://www.google.com/maps/search/?api=1&query=The+Wedding+Party+Group+Ashlea+Gardens+Pretoria',
  facebook: 'https://www.facebook.com/weddingpartysa',
  instagram: 'https://www.instagram.com/weddings.at.weddingparty/',
  google: {rating: '4.5', reviews: 127},
};

export const waLink = (text = 'Hello Wedding Party, I’d like to start planning an event.') =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;

export const planPath = '/start-planning/';

/* ------------------------------------------------------------------ */
/* Home                                                               */
/* ------------------------------------------------------------------ */

export const hero = {
  lines: ['Your vision.', 'Our experience.', 'Your perfect event.'],
  established: 'Established 2000 · 26+ years of wedding & event experience',
  disciplines: ['Décor', 'Flowers', 'Furniture', 'Rentals', 'Stationery', 'Printing', 'Event Management'],
  image: photo('hero-lakeside-table'),
  imageAlt: 'A long reception table by floor-to-ceiling windows, gold-framed chairs, candles and towering arrangements of peach and yellow roses.',
  place: 'Ashlea Gardens · Pretoria',
};

export type Category = {
  slug: string;
  path: string;
  title: string;
  blurb: string;
  image: string;
  alt: string;
};

export const roof = {
  eyebrow: 'All under one roof',
  heading: 'Everything you need. All under one roof.',
  body: 'Wedding Party Group brings together design, décor, flowers, furniture, rentals, stationery, printing and event management under one experienced team.',
  body2: 'Instead of coordinating multiple suppliers, you can have one team overseeing the details that bring your celebration together.',
};

export const categories: Category[] = [
  {slug: 'wedding-decor', path: '/wedding-decor/', title: 'Wedding Décor', blurb: 'Tablescapes, backdrops and styling, designed around your colours.', image: photo('sweetheart-table'), alt: 'A sweetheart table dressed in navy draping with gold lanterns and deep red flowers.'},
  {slug: 'flowers', path: '/flowers/', title: 'Flowers', blurb: 'Fresh and artificial arrangements, from posies to floral towers.', image: photo('floral-long-table'), alt: 'Tall floral arrangements in jewel tones above a long mirrored table.'},
  {slug: 'furniture', path: '/furniture/', title: 'Furniture', blurb: 'Chairs, tables and lounge settings for every venue and guest count.', image: photo('lawn-lounge-furniture'), alt: 'Vintage lounge furniture and rugs arranged on a lawn for an outdoor celebration.'},
  {slug: 'rentals', path: '/rentals/', title: 'Rentals', blurb: 'Underplates, glassware, linen, cake stands and more — our largest department.', image: photo('gold-underplates'), alt: 'Gold charger plates, folded napkins and glassware down a long table.'},
  {slug: 'stationery', path: '/stationery/', title: 'Stationery', blurb: 'Custom invitations and reception stationery, made to your design.', image: photo('green-gold-invitation'), alt: 'An invitation suite with a deep green envelope, gold wax seal and a fresh flower.'},
  {slug: 'printing', path: '/printing/', title: 'Printing', blurb: 'Signage, laser-cutting and sandblasting, all done in-house.', image: photo('gatsby-welcome'), alt: 'A Roaring Twenties welcome board framed by white ostrich feathers and gold stands.'},
  {slug: 'event-management', path: '/event-management/', title: 'Event Management', blurb: 'Full planning, partial planning or day-of coordination.', image: photo('purple-ballroom'), alt: 'A ballroom set with round tables under chandeliers, washed in violet uplighting.'},
  {slug: 'special-events', path: '/special-events/', title: 'Special Events', blurb: 'Birthdays, kitchen teas, corporate evenings and themed parties.', image: photo('birthday-30-balloons'), alt: 'A thirtieth birthday backdrop with black, gold and rose-gold balloons.'},
];

export const heritage = {
  eyebrow: 'Established in 2000',
  heading: 'More than 26 years of experience.',
  lines: ['Thousands of celebrations.', 'Thousands of details.', 'One experienced team.'],
  stats: [
    {value: '26+', label: 'Years of experience', count: 26, suffix: '+'},
    {value: '2000', label: 'Established'},
    {value: 'Full-service', label: 'Event specialists'},
    {value: 'One roof', label: 'Everything under it'},
  ],
};

/** Legs of the planning journey, in drawing order. */
export const journey = {
  eyebrow: 'How it comes together',
  heading: 'From the first idea to the final guest.',
  counterLabel: 'Suppliers you deal with',
  legs: [
    {step: 'Step 1', title: 'The first conversation', body: 'We listen to your ideas, your budget and the feeling you want the day to have — then offer creative suggestions of our own.'},
    {step: 'Step 2', title: 'Design & styling', body: 'Colours, florals, furniture, linen and tableware drawn together into one considered look for your venue.'},
    {step: 'Step 3', title: 'Made under one roof', body: 'Flowers arranged, stationery designed and printed, signage laser-cut and sandblasted, rentals packed — all in-house.'},
    {step: 'Step 4', title: 'The day itself', body: 'Our team sets up, styles and coordinates on the day, so you can be a guest at your own celebration.'},
  ],
  roofLabels: ['Décor', 'Flowers', 'Furniture', 'Rentals', 'Stationery', 'Printing', 'Events', 'Specials'],
};

export const why = {
  eyebrow: 'Why Wedding Party',
  heading: 'Why clients choose Wedding Party Group.',
  items: [
    {title: 'Experience', body: 'More than two decades in the wedding and event industry.'},
    {title: 'All under one roof', body: 'Décor, flowers, furniture, rentals, stationery, printing and event management.'},
    {title: 'One experienced team', body: 'A coordinated team instead of multiple disconnected suppliers.'},
    {title: 'In-house expertise', body: 'Design, floral, décor, graphic and event expertise within the business.'},
    {title: 'Personal service', body: 'Professional guidance from the first consultation through to the event.'},
    {title: 'Event-day support', body: 'A team experienced in the practical realities of preparing and executing events.'},
  ],
};

export const testimonial = {
  quote:
    'Wedding Party excelled because they were organised, well connected, accessible and communicated at a very high professional level. Every great orchestra needs a great conductor and every great football team needs a great quarterback; a memorable wedding needs Wedding Party.',
  name: 'James Motsepe',
  role: 'Groom',
};

export const owner = {
  eyebrow: 'Meet the owner',
  name: 'Renette F. Hamman-Nel',
  role: 'Owner · Creative Event & Décor Designer and Stylist',
  image: photo('owner-renette'),
  body: [
    'Our diverse team is made up of experienced, professional consultants who help create memorable, stylish and elegant weddings and special events.',
    'Through years in the industry we have built extensive vendor relationships — which lets us produce top-rate events in every respect, and pass exclusive discounts along to you.',
  ],
};

export const work = {
  eyebrow: 'Our work',
  heading: 'Real celebrations, styled by our team.',
  body: 'A few of the weddings and events we have designed, dressed and delivered.',
  items: [
    {src: photo('hero-lakeside-table'), alt: 'Lakeside reception table with gold chairs and floral towers', caption: 'Lakeside long table'},
    {src: photo('sweetheart-table'), alt: 'Navy and burgundy sweetheart table with lanterns', caption: 'Navy, burgundy & gold'},
    {src: photo('garden-ceremony'), alt: 'Garden reception with white chairs and pastel flowers', caption: 'Garden classic splendour'},
    {src: photo('white-greenery-tables'), alt: 'Long white tables with greenery runners in a brick venue', caption: 'White & greenery'},
    {src: photo('candlelit-round-table'), alt: 'Round table with tall white florals under fairy lights', caption: 'Candlelit round tables'},
    {src: photo('crystal-candelabra'), alt: 'Pink taper candles in crystal holders with pastel flowers', caption: 'Dusty pink & crystal'},
    {src: photo('monochrome-stripe-table'), alt: 'Long table with black-and-white striped runner and gold chairs', caption: 'Black & white pinstripe'},
    {src: photo('floral-long-table'), alt: 'Mirrored long table beneath abundant floral arrangements', caption: 'Opulent splendour'},
    {src: photo('moroccan-theme'), alt: 'Moroccan-themed lounge with lanterns and jewel-coloured textiles', caption: 'Moroccan theme'},
  ],
};

export const plan = {
  eyebrow: 'Start planning',
  heading: 'Tell us about your celebration.',
  body: 'No obligation. Share the essentials and we’ll come back to you with ideas and a quote — usually on WhatsApp, the way most of our clients prefer.',
  countdownLabel: 'Your day, counting down',
  eventTypes: ['Wedding', 'Kitchen tea / bridal shower', 'Birthday', 'Corporate event', 'Baby shower / gender reveal', 'Other celebration'],
  serviceOptions: ['Wedding planning', 'Décor & styling', 'Flowers', 'Furniture', 'Rentals', 'Stationery & invitations', 'Printing & signage', 'Event management', 'Marquees & tents', 'Cakes', 'Entertainment'],
};

/* ------------------------------------------------------------------ */
/* Weddings                                                           */
/* ------------------------------------------------------------------ */

export const weddings = {
  eyebrow: 'Weddings',
  title: ['Your wedding.', 'Your story.', 'Beautifully created.'],
  lead: 'From the first idea to the final guest, our experienced team brings your wedding together under one roof — design, flowers, furniture, rentals, stationery and the day itself.',
  image: photo('sweetheart-table'),
  imageAlt: 'A sweetheart table with navy draping, gold lanterns and deep red roses.',
  servicesHeading: 'Everything your wedding needs.',
  services: [
    {title: 'Wedding Planning', body: 'Full-service planning, partial planning or a tailored elopement package.'},
    {title: 'Wedding Décor', body: 'A complete look designed around your colours, theme and venue.'},
    {title: 'Floral Design', body: 'Fresh and artificial arrangements, from table posies to floral towers.'},
    {title: 'Furniture', body: 'Chairs, tables, head tables and lounge areas.'},
    {title: 'Table Styling', body: 'Underplates, linen, glassware and centrepieces, layered with care.'},
    {title: 'Wedding Rentals', body: 'Our largest department — hundreds of items to choose from.'},
    {title: 'Stationery', body: 'Reception stationery, menus, programmes and seating charts.'},
    {title: 'Invitations', body: 'Custom invitations in any colour, layout or finish.'},
    {title: 'Printing', body: 'Signage, laser-cutting, sandblasting and gift packaging in-house.'},
    {title: 'Lighting', body: 'Fairy lights, candlelight and feature lighting to set the mood.'},
    {title: 'Marquees & Tents', body: 'Shelter and structure for garden and farm celebrations.'},
    {title: 'Event Coordination', body: 'Day-of coordination so every detail lands as planned.'},
    {title: 'Full Event Management', body: 'One team overseeing the whole celebration, start to finish.'},
  ],
  levels: {
    heading: 'Choose how much we carry.',
    body: 'You decide which services Wedding Party handles; that shapes the plan and the cost.',
    items: [
      {title: 'Full-service planning', body: 'We design, source, produce and run the whole wedding with you.'},
      {title: 'Partial planning', body: 'You’ve started — we step in where you need us most.'},
      {title: 'Day-of coordination', body: 'Your plans, our team on the day making them happen.'},
      {title: 'Elopements', body: 'Small, intimate and beautifully considered.'},
    ],
  },
  gallery: [
    {src: photo('garden-ceremony'), alt: 'Garden reception with pastel florals and white chairs'},
    {src: photo('white-gold-tables'), alt: 'White and gold long tables with candelabra'},
    {src: photo('candlelit-round-table'), alt: 'Round table with tall white florals'},
    {src: photo('blush-place-setting'), alt: 'Blush place setting with gold-beaded underplate'},
    {src: photo('birdcage-florals'), alt: 'White birdcage centrepiece with roses and pearls'},
    {src: photo('monogram-cake-backdrop'), alt: 'Wedding cake before a monogrammed backdrop'},
  ],
};

/* ------------------------------------------------------------------ */
/* Service pages                                                      */
/* ------------------------------------------------------------------ */

export type ServicePage = {
  slug: string;
  eyebrow: string;
  title: string;
  lead: string;
  intro: string[];
  offersHeading: string;
  offers: {title: string; body: string}[];
  tags?: {heading: string; items: string[]};
  gallery: {src: string; alt: string}[];
  note?: string;
};

export const servicePages: Record<string, ServicePage> = {
  'wedding-decor': {
    slug: 'wedding-decor',
    eyebrow: 'Wedding Décor',
    title: 'Décor with sophistication, perfection and elegance.',
    lead: 'We bring a fresh perspective to event design, working with your budget and ideas to create an extraordinary event with timeless style.',
    intro: [
      'Tell us your colours, your venue and the mood you imagine. We design the look, then dress every surface of it — from the ceremony aisle to the last place setting — using stock we own and arrangements we make ourselves.',
    ],
    offersHeading: 'What we style',
    offers: [
      {title: 'Theme & colour design', body: 'A considered palette and concept for the whole day.'},
      {title: 'Tablescapes', body: 'Underplates, linen, glassware and centrepieces layered together.'},
      {title: 'Themed backdrops', body: 'Statement backdrops for the head table, cake and photographs.'},
      {title: 'Aisle & ceremony', body: 'Aisle runners, ceremony florals and seating.'},
      {title: 'Candles & lighting', body: 'Candelabra, lanterns, votives and fairy lights.'},
      {title: 'Set-up & styling', body: 'Our team dresses the venue and clears it afterwards.'},
    ],
    tags: {
      heading: 'Setups we’ve styled',
      items: ['Antique Pink & Rose Gold', 'Black Glass Chic', 'Classic Elegance', 'Crystal Fairy Tale', 'Delft, Navy, Burgundy & Gold', 'Dusty Pink & Crystal', 'Glass & Gold Sensation', 'Memoire White Classic', 'Opulent Splendour', 'Royal Elegant', 'Vintage Nude Pampas', 'White & Gold Crystal Feast'],
    },
    gallery: [
      {src: photo('sweetheart-table'), alt: 'Navy and burgundy sweetheart table'},
      {src: photo('white-gold-tables'), alt: 'White and gold long tables'},
      {src: photo('crystal-candelabra'), alt: 'Pink candles in crystal holders'},
      {src: photo('navy-burgundy-table'), alt: 'Navy and burgundy table with blue vases'},
      {src: photo('monochrome-stripe-table'), alt: 'Black and white striped runner table'},
      {src: photo('white-candles-wall'), alt: 'White candles before a brick wall with fairy lights'},
    ],
  },
  flowers: {
    slug: 'flowers',
    eyebrow: 'Flowers',
    title: 'Flowers that set the tone of the room.',
    lead: 'Fresh and artificial flower arrangements, designed with the palette and the venue in mind.',
    intro: [
      'The type, colour and arrangement of flowers can say a great deal. Whatever the style, flowers bring an elegance to an event that nothing else quite matches — so we treat them as part of the design, not an afterthought.',
    ],
    offersHeading: 'Floral design',
    offers: [
      {title: 'Fresh arrangements', body: 'Seasonal blooms arranged for your colours and theme.'},
      {title: 'Artificial arrangements', body: 'Lasting silk florals — ideal for décor you want to keep.'},
      {title: 'Table centrepieces', body: 'Low posies, crystal stands and tall floral towers.'},
      {title: 'Ceremony florals', body: 'Aisle, arch and backdrop arrangements.'},
      {title: 'Head-table florals', body: 'Abundant runners and statement pieces for the main table.'},
      {title: 'Event florals', body: 'Corporate, birthday and celebration arrangements.'},
    ],
    tags: {
      heading: 'A few of our floral setups',
      items: ['Barnyard Wedding', 'Garden Classic Splendour', 'Navy Blue, Burgundy & White Wedding', 'Smithfield Wedding', 'Vintage White Gold Wedding', 'Warm, Welcoming Atmosphere Wedding', 'Blue & White Pinstripe Wedding', 'Classic White & Gold Wedding', 'Pink Fantasy', 'French Provincial Flair Picnic'],
    },
    gallery: [
      {src: photo('floral-long-table'), alt: 'Floral towers above a long table'},
      {src: photo('garden-ceremony'), alt: 'Garden setting with pastel florals'},
      {src: photo('floral-urn'), alt: 'Pastel roses and lilies in a vintage urn'},
      {src: photo('crystal-centrepiece'), alt: 'Crystal stand centrepiece with white flowers'},
      {src: photo('candle-glow'), alt: 'Candlelit table with white flowers'},
      {src: photo('sunflower-table'), alt: 'Table with sunflowers and gold underplates'},
    ],
  },
  furniture: {
    slug: 'furniture',
    eyebrow: 'Furniture',
    title: 'Seating and tables for every kind of celebration.',
    lead: 'From long banquet tables to lounge corners on the lawn — furniture that suits the venue and the way your guests will spend the evening.',
    intro: [
      'Furniture shapes how a room feels and how guests move through it. We plan the layout with you, supply the pieces and set them up as part of the overall design.',
    ],
    offersHeading: 'Furniture hire',
    offers: [
      {title: 'Chairs', body: 'Gold-framed, white, crossback and clear styles.'},
      {title: 'Tables', body: 'Long banquet tables, rounds, and wooden harvest tables.'},
      {title: 'Head & sweetheart tables', body: 'A focal point for the couple and bridal party.'},
      {title: 'Lounge settings', body: 'Couches, rugs and side tables for relaxed corners.'},
      {title: 'Cocktail & bar tables', body: 'Draped high tables for welcome drinks and terraces.'},
      {title: 'Marquees & tents', body: 'Structure and shelter for outdoor celebrations.'},
    ],
    gallery: [
      {src: photo('hero-lakeside-table'), alt: 'Gold-framed chairs at a lakeside long table'},
      {src: photo('lawn-lounge-furniture'), alt: 'Lounge furniture on a lawn'},
      {src: photo('ghost-chairs-table'), alt: 'Clear chairs at a wooden table with navy runner'},
      {src: photo('white-chairs-long-table'), alt: 'White chairs along a long table'},
      {src: photo('garden-venue'), alt: 'Draped cocktail tables in a garden venue'},
      {src: photo('dark-wood-table'), alt: 'Dark wooden table set for dinner'},
    ],
    note: 'Ask us for current furniture styles and quantities — stock is limited and books up early.',
  },
  rentals: {
    slug: 'rentals',
    eyebrow: 'Rentals',
    title: 'Our largest department.',
    lead: 'Whether it is an elaborate wedding or a small, intimate dinner party, we have a huge variety of rental items to make it complete.',
    intro: [
      'Browse the catalogue below and add anything you like to your enquiry — we’ll confirm availability and send a quote. Popular items are booked well in advance, so if you see something you need, enquire early.',
    ],
    offersHeading: 'Also available to hire',
    offers: [
      {title: 'Marquees & tents', body: 'For garden, farm and outdoor venues.'},
      {title: 'Furniture', body: 'Chairs, tables and lounge settings.'},
      {title: 'Table linen & draping', body: 'Cloths, napkins and backdrop draping.'},
      {title: 'Themed backdrops', body: 'Ready-made statement backdrops.'},
      {title: 'Lighting', body: 'Fairy lights, light boxes and focal lights.'},
      {title: 'Catering equipment', body: 'Chafing dishes and serving ware.'},
    ],
    gallery: [],
  },
  stationery: {
    slug: 'stationery',
    eyebrow: 'Stationery',
    title: 'Invitations and stationery, made to your design.',
    lead: 'All our stationery is custom-made to your specifications. No design or colour is set in stone — layouts, colours and finishes are altered to your taste.',
    intro: [
      'Email or WhatsApp us a picture or an idea and we’ll design around it. Because we print, laser-cut and finish in-house, your invitations can match everything else on the day.',
    ],
    offersHeading: 'What we make',
    offers: [
      {title: 'Invitations', body: 'Classic, laser-cut, pocket-fold and wax-sealed suites.'},
      {title: 'Reception stationery', body: 'Menus, programmes and order-of-service cards.'},
      {title: 'Table seating', body: 'Seating charts, table numbers and name cards.'},
      {title: 'Welcome boards', body: 'Signage to greet your guests in style.'},
      {title: 'Guest books & thank-you cards', body: 'Keepsakes that match the rest of the suite.'},
      {title: 'Branding & packaging', body: 'Monograms, gift boxes and favour packaging.'},
    ],
    tags: {
      heading: 'Colour collections from previous work',
      items: ['Peach & Orange', 'Cream', 'Black', 'Baby Blue', 'Yellow', 'White', 'Silver', 'Purple', 'Red', 'Pink', 'Navy', 'Grey', 'Lilac', 'Green', 'Gold', 'Lime'],
    },
    gallery: [
      {src: photo('green-gold-invitation'), alt: 'Green envelope invitation with gold wax seal'},
      {src: photo('gold-black-invitation'), alt: 'Black laser-cut and gold invitation suite'},
      {src: photo('navy-lasercut-invitation'), alt: 'Navy laser-cut pocket invitation'},
      {src: photo('ivory-lace-invitation'), alt: 'Ivory lace invitation with gold seal'},
      {src: photo('pink-floral-invitation'), alt: 'Pink floral invitation suite'},
      {src: photo('wax-seal-stationery'), alt: 'White stationery with a pressed wax seal'},
    ],
  },
  printing: {
    slug: 'printing',
    eyebrow: 'Printing',
    title: 'Printing, laser-cutting and sandblasting — in-house.',
    lead: 'All formats of printing, plus laser-cutting and sandblasting, done under our own roof so every printed detail matches the design.',
    intro: [
      'Signage, seating charts, menus and personalised pieces are produced alongside your décor — no separate printer, no colour that doesn’t quite match.',
    ],
    offersHeading: 'What we produce',
    offers: [
      {title: 'Welcome boards & signage', body: 'From one welcome sign to full wayfinding.'},
      {title: 'Seating charts', body: 'Large-format charts that suit your theme.'},
      {title: 'Laser-cutting', body: 'Names, monograms, cake toppers and décor pieces.'},
      {title: 'Sandblasting', body: 'Personalised glassware and keepsakes.'},
      {title: 'Gift boxes & packaging', body: 'Favours and gift boxes, branded to the event.'},
      {title: 'Corporate branding', body: 'Printed material for launches, awards and conferences.'},
    ],
    gallery: [
      {src: photo('gatsby-welcome'), alt: 'Roaring Twenties welcome board'},
      {src: photo('welcome-sign-balloons'), alt: 'Welcome sign with blue and silver balloons'},
      {src: photo('monogram-cake-backdrop'), alt: 'Monogrammed backdrop behind a cake'},
      {src: photo('navy-lasercut-invitation'), alt: 'Laser-cut navy invitation'},
    ],
  },
  'event-management': {
    slug: 'event-management',
    eyebrow: 'Event Management',
    title: 'The success of any event starts with good planning.',
    lead: 'Planning meticulously, comprehensively and well in advance — with a company that knows the correct proceedings for your wedding or event.',
    intro: [
      'Event management is the application of project management to celebrations of every size: weddings, formal parties, ceremonies, conferences and corporate events.',
      'You decide which services you want Wedding Party to handle, and that establishes the cost for your event. Our management fee is negotiated with each client as a percentage of the event cost.',
    ],
    offersHeading: 'Ways we can help',
    offers: [
      {title: 'Full-service planning', body: 'Concept to clean-up, with one team accountable.'},
      {title: 'Partial planning', body: 'We take on the parts you’d rather not.'},
      {title: 'Day-of coordination', body: 'A calm team running your schedule on the day.'},
      {title: 'Elopement packages', body: 'Intimate, simple and still beautifully styled.'},
      {title: 'Corporate events', body: 'Conferences, awards ceremonies and functions.'},
      {title: 'Supplier coordination', body: 'Trusted vendor relationships and exclusive discounts.'},
    ],
    gallery: [
      {src: photo('purple-ballroom'), alt: 'Ballroom with violet uplighting'},
      {src: photo('blue-lit-venue'), alt: 'Modern venue lit in blue with a balloon installation'},
      {src: photo('garden-venue'), alt: 'Garden venue with draped cocktail tables'},
      {src: photo('white-gold-tables'), alt: 'White and gold long tables'},
    ],
  },
  'special-events': {
    slug: 'special-events',
    eyebrow: 'Special Events',
    title: 'Every celebration deserves the same care.',
    lead: 'No event is too big or too small. Birthdays, kitchen teas, gender reveals, corporate evenings and themed parties — styled with the same eye as our weddings.',
    intro: [
      'Bring us the occasion and the theme; we’ll bring décor, flowers, furniture, rentals, cakes, printing and entertainment, all from one team.',
    ],
    offersHeading: 'Occasions we style',
    offers: [
      {title: 'Milestone birthdays', body: 'From fourteenth-birthday bashes to fortieth and beyond.'},
      {title: 'Kitchen teas & bridal showers', body: 'Including bridal pamper picnics.'},
      {title: 'Baby showers & gender reveals', body: 'Soft, playful styling and celebration cakes.'},
      {title: 'Corporate events', body: 'Formal awards ceremonies, functions and launches.'},
      {title: 'Themed parties', body: 'Gatsby, Moroccan, Cowboy Western — or your own idea.'},
      {title: 'Entertainment', body: 'DJs, pianists, fire dancers, fireworks, a cigar bar and lawn games.'},
    ],
    tags: {
      heading: 'Recent occasions',
      items: ['14th Birthday Bash', '18th Birthday', '30th Birthday', '45th Birthday Party', 'Bridal Pamper Picnic', 'Corporate Event', 'Cowboy Western', 'Formal Corporate Awards Ceremony', 'Gatsby Party', 'Gender Reveal Picnic', 'Moroccan Theme', 'Pink Kitchen Tea', 'Hope Ministries'],
    },
    gallery: [
      {src: photo('birthday-30-balloons'), alt: 'Thirtieth birthday balloon backdrop'},
      {src: photo('football-theme-party'), alt: 'Football club themed party table'},
      {src: photo('western-theme'), alt: 'Cowboy Western themed décor with a cactus and wanted poster'},
      {src: photo('moroccan-theme'), alt: 'Moroccan-themed lounge'},
      {src: photo('sweets-table'), alt: 'Pink macaron and sweets table'},
      {src: photo('lantern-sunflowers'), alt: 'Lantern and sunflowers on a gingham cloth'},
      {src: photo('baby-shower-cake'), alt: 'Baby shower cake with gold and white baubles'},
      {src: photo('drinks-station'), alt: 'Juice dispensers on a drinks station'},
    ],
  },
};

export const rentalRules = [
  'We work strictly first come, first served — stock per item is limited. Please book at least 3–4 months in advance; quotes are valid for 10 days.',
  'Confirm exact quantities before booking. No changes or swaps once booked.',
  'A 100% deposit secures the booking. Deposits are non-refundable on cancellation.',
  'Weekend rentals: collect on Thursdays, 14:00–16:00. Return on Tuesdays, 09:00–11:00. No Saturday returns.',
  'Midweek rentals: collect on Mondays at 14:00, return on Fridays by 11:00.',
  'Items may not be borrowed for mock tables — you are welcome to hire them for your mock table and set up at the venue.',
  'Items must be returned clean and free of wax and mould. Cleaning penalties and a laundry fee for linen apply.',
  'Clients are responsible for breakages, chips, burn marks and damage. Damaged items are considered sold; replacements must be made within 4 days or double rental is charged.',
  'Please check that table cloths and chair covers fit the venue’s tables and chairs.',
  'Everything is packed, bubble-wrapped and marked — please return it in the same wrapping.',
];

/* ------------------------------------------------------------------ */
/* Navigation & page metadata                                         */
/* ------------------------------------------------------------------ */

export const nav = [
  {label: 'Weddings', href: '/weddings/'},
  {label: 'Rentals', href: '/rentals/'},
  {label: 'Our work', href: '/#work'},
  {label: 'About', href: '/#about'},
];

export type RouteMeta = {path: string; title: string; description: string};

export const routes: RouteMeta[] = [
  {path: '/', title: `${brand.name} — Pretoria’s Full-Service Wedding & Event Specialists`, description: 'Décor, flowers, furniture, rentals, stationery, printing and event management under one roof. Established in 2000 — more than 26 years of wedding and event experience in Pretoria.'},
  {path: '/weddings/', title: `Weddings in Pretoria — Planning, Décor & Flowers | ${brand.name}`, description: 'Your wedding, your story, beautifully created. Wedding planning, décor, florals, furniture, rentals, invitations, printing and full event management from one experienced Pretoria team.'},
  {path: '/wedding-decor/', title: `Wedding Décor & Styling in Pretoria | ${brand.name}`, description: 'Tablescapes, themed backdrops, aisle styling, candles and lighting — wedding décor designed around your colours and venue, set up by our team.'},
  {path: '/flowers/', title: `Wedding & Event Flowers in Pretoria | ${brand.name}`, description: 'Fresh and artificial flower arrangements, centrepieces, floral towers and ceremony florals for weddings and events in Pretoria.'},
  {path: '/furniture/', title: `Wedding & Event Furniture Hire in Pretoria | ${brand.name}`, description: 'Chairs, tables, head tables, lounge settings, cocktail tables and marquees to hire for weddings and events in Pretoria.'},
  {path: '/rentals/', title: `Wedding & Event Rentals in Pretoria — Catalogue | ${brand.name}`, description: 'Browse underplates, glassware, napkins, cake stands, vases, crockery and more. Add items to your enquiry and we’ll confirm availability.'},
  {path: '/stationery/', title: `Wedding Invitations & Stationery in Pretoria | ${brand.name}`, description: 'Custom wedding invitations and reception stationery — menus, seating charts, welcome boards and thank-you cards, designed to your taste.'},
  {path: '/printing/', title: `Event Printing, Laser-Cutting & Sandblasting | ${brand.name}`, description: 'All formats of printing, laser-cutting and sandblasting in-house: signage, seating charts, personalised glassware and gift packaging.'},
  {path: '/event-management/', title: `Wedding & Event Management in Pretoria | ${brand.name}`, description: 'Full-service planning, partial planning, day-of coordination and elopement packages from a Pretoria team established in 2000.'},
  {path: '/special-events/', title: `Birthdays, Kitchen Teas & Corporate Events | ${brand.name}`, description: 'Décor, flowers, rentals, cakes and entertainment for birthdays, kitchen teas, gender reveals, corporate events and themed parties.'},
  {path: '/start-planning/', title: `Start Planning — Request a Quote | ${brand.name}`, description: 'Tell us about your wedding or event and we’ll come back with ideas and a quote. WhatsApp 082 685 8885.'},
];

export const routeMeta = (path: string) => routes.find((r) => r.path === path) ?? routes[0];
