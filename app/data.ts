// PASTE IN BROWSER CONSOLE
// JSON.stringify(window.__myx.searchData.results.products.map((e) => {
//   return {
//       id: e.productId,
//       brand: e.brand,
//       name: e.productName,
//       category: e. category,
//       image: e.searchImage,
//       link: e.landingPageUrl,
//       price: e.price,
//   }
// }))

export const getGameSlides = (): Product[] => {
  return getEasyGame(slides);
};

const getEasyGame = (slides: Product[]) => {
  // TODO: write test
  const slidesCopy = [...slides];
  slidesCopy.sort((a, b) => a.price - b.price);
  const slidesCount = slidesCopy.length;

  const extremes = shuffleArray([
    slidesCopy[0],
    slidesCopy[1],
    slidesCopy[slidesCount - 1],
    slidesCopy[slidesCount - 2],
  ]);

  const mids = [
    slidesCopy[dividendBy2(slidesCount) - 1],
    slidesCopy[dividendBy2(slidesCount)],
    slidesCopy[dividendBy2(slidesCount) + 1],
  ];

  //* return data
  const easiest: Product[] = interleave(extremes, mids);
  const remaining: Product[] = slides.filter((e) => {
    // return elements not in easiest
    return easiest.findIndex((f) => f.id === e.id) === -1;
  });

  return [...easiest, ...remaining];
};

function shuffleArray(array: any[]) {
  const shuffled = array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffled;
}

function dividendBy2(num: number) {
  return Math.floor(num / 2);
}

function interleave(left: any[], right: any[]) {
  const both = [];
  let i;

  for (i = 0; i < left.length; i += 1) {
    both.push(left[i]);

    // because a template string will have one fewer value
    // than it will have string parts
    if (i < right.length) {
      both.push(right[i]);
    }
  }

  return both;
}

const slides: Product[] = [
  {
    id: 11425210,
    brand: "Vishudh",
    name: "Vishudh Women Black Solid Tunic",
    category: "Tunics",
    image:
      "http://assets.myntassets.com/assets/images/productimage/2020/1/29/f679e5dc-0211-43d3-8894-e1c6b2c2e21d1580259030226-1.jpg",
    link: "tunics/vishudh/vishudh-women-black-solid-tunic/11425210/buy",
    price: 560,
  },
  {
    id: 30478604,
    brand: "Anouk",
    name: "Anouk Floral Embroidered Round Neck Pure Cotton Straight Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/2024/AUGUST/5/2PN1z1TT_33283426c5214b38ac2fa7345d193ea3.jpg",
    link: "kurtis/anouk/anouk-floral-embroidered-round-neck-pure-cotton-straight-kurti/30478604/buy",
    price: 702,
  },
  {
    id: 30160731,
    brand: "ADA",
    name: "ADA Ethnic Motifs Embroidered Thread Work Thread Work Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/30160731/2024/7/9/b5b9f310-35fb-4766-94e1-3403a5c35fba1720515563802ADAEthnicMotifsEmbroideredThreadWorkThreadWorkKurti1.jpg",
    link: "kurtis/ada/ada-ethnic-motifs-embroidered-thread-work-thread-work-kurti/30160731/buy",
    price: 2290,
  },
  {
    id: 9971481,
    brand: "Vishudh",
    name: "Vishudh Maroon Printed Tunic",
    category: "Tunics",
    image:
      "http://assets.myntassets.com/assets/images/productimage/2019/6/10/930ac966-5c02-48e0-a8e4-48401dbecbfc1560150442437-1.jpg",
    link: "tunics/vishudh/vishudh-maroon-printed-tunic/9971481/buy",
    price: 311,
  },
  {
    id: 30478601,
    brand: "Anouk",
    name: "Anouk Floral Embroidered Notched Neck Thread Work Short Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/2024/AUGUST/3/30rkCkbc_fb2ec7ef94884913b3b13962c8cb97f3.jpg",
    link: "kurtis/anouk/anouk-floral-embroidered-notched-neck-thread-work-short-kurti/30478601/buy",
    price: 702,
  },
  {
    id: 17241038,
    brand: "ADA",
    name: "ADA White Ethnic Motifs Embroidered Chikankari Handloom Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/17241038/2022/3/7/15fc419c-7f3c-4f37-ba0e-4252f1a2e0d81646636412348-White-Cotton-Hand-Embroidered-Chikankari-Kurti-7451646636411-1.jpg",
    link: "kurtis/ada/ada-white-ethnic-motifs-embroidered-chikankari-handloom-kurti/17241038/buy",
    price: 1690,
  },
  {
    id: 17514320,
    brand: "Vishudh",
    name: "Vishudh Navy Blue & Cream-Coloured  Printed Viscose Rayon Tunic",
    category: "Tunics",
    image:
      "http://assets.myntassets.com/assets/images/17514320/2022/3/14/e3aae83c-a06e-46f0-a121-5a031e059d9a1647252005347VishudhWomenNavyBlueTunics1.jpg",
    link: "tunics/vishudh/vishudh-navy-blue--cream-coloured--printed-viscose-rayon-tunic/17514320/buy",
    price: 359,
  },
  {
    id: 29958960,
    brand: "Anouk",
    name: "Anouk Ethnic Printed Cuban Collar Pure Cotton Shirt Style Top",
    category: "Tops",
    image:
      "http://assets.myntassets.com/assets/images/29958960/2024/6/13/28b75258-4d5f-478a-bfa2-18455fd5a0c01718280596571AnoukPrintMandarinCollarCottonTop4.jpg",
    link: "tops/anouk/anouk-ethnic-printed-cuban-collar-pure-cotton-shirt-style-top/29958960/buy",
    price: 699,
  },
  {
    id: 11516042,
    brand: "ADA",
    name: "ADA Women Black & Grey Chikankari Hand Embroidered Pure Cotton Straight Sustainable Handloom Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/11516042/2020/2/28/15c1fb4f-585b-4844-8059-93f1ad548c711582890744059-ADA-Women-Black--Grey-Chikankari-Hand-Embroidered-Kurti-8261-1.jpg",
    link: "kurtis/ada/ada-women-black--grey-chikankari-hand-embroidered-pure-cotton-straight-sustainable-handloom-kurti/11516042/buy",
    price: 999,
  },
  {
    id: 30478609,
    brand: "Anouk",
    name: "Anouk Floral Embroidered Thread Work Liva Thread Work Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/2024/AUGUST/3/atr55MTa_96815fc634b74f9ab9b11b1970b324f1.jpg",
    link: "kurtis/anouk/anouk-floral-embroidered-thread-work-liva-thread-work-kurti/30478609/buy",
    price: 776,
  },
  {
    id: 10920730,
    brand: "Vishudh",
    name: "Vishudh  Printed Curved Hem Tunic",
    category: "Tunics",
    image:
      "http://assets.myntassets.com/assets/images/productimage/2019/11/5/af9b535d-9f2e-4aa8-ab89-fef6108f71391572931685218-1.jpg",
    link: "tunics/vishudh/vishudh--printed-curved-hem-tunic/10920730/buy",
    price: 379,
  },
  {
    id: 29280632,
    brand: "ADA",
    name: "ADA Ethnic Motifs Embroidered Thread Work Chanderi Straight Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/29280632/2024/4/30/03dac9e7-ff3c-4953-8a5d-9a481458bda11714496869586EthnicMotifsLucknowiChikankariOliveGreenChanderiKurti1.jpg",
    link: "kurtis/ada/ada-ethnic-motifs-embroidered-thread-work-chanderi-straight-kurti/29280632/buy",
    price: 1990,
  },
  {
    id: 30478600,
    brand: "Anouk",
    name: "Anouk Floral Embroidered Mandarin Collar Thread Work Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/2024/AUGUST/3/e7S7wOej_c45ae90fd9d24dc58c43e8ae06ff0d94.jpg",
    link: "kurtis/anouk/anouk-floral-embroidered-mandarin-collar-thread-work-kurti/30478600/buy",
    price: 813,
  },
  {
    id: 13000002,
    brand: "Vishudh",
    name: "Vishudh Women Red Printed A-Line Top",
    category: "Tops",
    image:
      "http://assets.myntassets.com/assets/images/productimage/2020/11/19/5ce647c4-3075-422f-a3a7-4b8b2ea05f791605752961129-1.jpg",
    link: "tops/vishudh/vishudh-women-red-printed-a-line-top/13000002/buy",
    price: 406,
  },
  {
    id: 14956298,
    brand: "ADA",
    name: "ADA Yellow & Off White Sustainable Ethnic Motifs Chikankari Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/14956298/2021/8/4/ce37eb30-ff4e-4515-8fb5-a66f3b36f2641628071769768-Women-Yellow-Cotton-Chikankari-Hand-Embroidered-Kurti-952162-1.jpg",
    link: "kurtis/ada/ada-yellow--off-white-sustainable-ethnic-motifs-chikankari-kurti/14956298/buy",
    price: 999,
  },
  {
    id: 23790776,
    brand: "Nayam By Lakshita",
    name: "Nayam By Lakshita Shirt Collar Printed Cotton Cambric Tunic",
    category: "Tunics",
    image:
      "http://assets.myntassets.com/assets/images/23790776/2023/7/5/021b296d-8088-40d4-ba18-03d9d48387961688535564612-Nayam-By-Lakshita-Women-Tunics-8671688535564190-1.jpg",
    link: "tunics/nayam+by+lakshita/nayam-by-lakshita-shirt-collar-printed-cotton-cambric-tunic/23790776/buy",
    price: 873,
  },
  {
    id: 24996396,
    brand: "Nayam By Lakshita",
    name: "Nayam By Lakshita Embroidered Cotton Tunic",
    category: "Tunics",
    image:
      "http://assets.myntassets.com/assets/images/24996396/2023/11/8/ab582a5d-f7db-4498-8232-72f78e8ede8d1699425412827NayamByLakshitaEmbroideredCottonTunic1.jpg",
    link: "tunics/nayam+by+lakshita/nayam-by-lakshita-embroidered-cotton-tunic/24996396/buy",
    price: 1031,
  },
  {
    id: 15797558,
    brand: "ADA",
    name: "ADA Black & Rust Ethnic Motifs Embroidered Chikankari Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/15797558/2021/10/25/f1b35627-7f89-4160-9f4c-fc7d363ef6be1635133529691THEDRYSTATEWOMENSCOLORBLOCKSWEATSHIRTWITHPOCKETDREAMONTAPEDE1.jpg",
    link: "kurtis/ada/ada-black--rust-ethnic-motifs-embroidered-chikankari-kurti/15797558/buy",
    price: 1790,
  },
  {
    id: 30478585,
    brand: "Anouk",
    name: "Anouk Floral Embroidered Notch Neck Straight Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/2024/AUGUST/3/3cUMIOrJ_70fb20ef09254528941fced72af53084.jpg",
    link: "kurtis/anouk/anouk-floral-embroidered-notch-neck-straight-kurti/30478585/buy",
    price: 739,
  },
  {
    id: 9035869,
    brand: "Rain & Rainbow",
    name: "Rain & Rainbow Blue & Orange Printed A-Line Tunic",
    category: "Tunics",
    image:
      "http://assets.myntassets.com/assets/images/9035869/2019/3/22/a837344d-9e4f-4e41-9b5b-b1d4761608541553231052357-Rain--Rainbow-Women-Tunics-7381553231050679-1.jpg",
    link: "tunics/rain+%26+rainbow/rain--rainbow-blue--orange-printed-a-line-tunic/9035869/buy",
    price: 878,
  },
  {
    id: 11516044,
    brand: "ADA",
    name: "ADA Women White Chikankari Hand Embroidered Pure Cotton Semi-Sheer A-Line Sustainable Handloom Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/11516044/2024/2/23/5554fe88-f7d8-4e24-af36-0cace940f5f71708687491226-ADA-Women-White-Chikankari-Hand-Embroidered-Pure-Cotton-Semi-1.jpg",
    link: "kurtis/ada/ada-women-white-chikankari-hand-embroidered-pure-cotton-semi-sheer-a-line-sustainable-handloom-kurti/11516044/buy",
    price: 1590,
  },
  {
    id: 30478606,
    brand: "Anouk",
    name: "Anouk Floral Embroidered Puff Sleeves Straight Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/2024/AUGUST/5/OttUDY1e_f2f5454856a947fdb5bf90a227156a2f.jpg",
    link: "kurtis/anouk/anouk-floral-embroidered-puff-sleeves-straight-kurti/30478606/buy",
    price: 702,
  },
  {
    id: 30504184,
    brand: "KALINI",
    name: "KALINI Floral Printed Keyhole Neck Puff Sleeves A Line Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/2024/AUGUST/6/IMaZQHVt_1f0ce7d470f8431e8cfa591c8f091b41.jpg",
    link: "kurtis/kalini/kalini-floral-printed-keyhole-neck-puff-sleeves-a-line-kurti/30504184/buy",
    price: 659,
  },
  {
    id: 28927748,
    brand: "Rain & Rainbow",
    name: "Rain & Rainbow Ethnic Motifs Printed Pure Cotton A-Line Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/28927748/2024/4/13/fdb42a99-c3ea-4061-983a-32a1d32fe8d31713017096289Kurtis1.jpg",
    link: "kurtis/rain+%26+rainbow/rain--rainbow-ethnic-motifs-printed-pure-cotton-a-line-kurti/28927748/buy",
    price: 700,
  },
  {
    id: 30478596,
    brand: "Anouk",
    name: "Anouk Geometric Embroidered V-Neck Pleated Straight Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/2024/AUGUST/5/tmNwwxrk_0db0ebe9eb5643a9b4207b0faeaede9c.jpg",
    link: "kurtis/anouk/anouk-geometric-embroidered-v-neck-pleated-straight-kurti/30478596/buy",
    price: 739,
  },
  {
    id: 16293016,
    brand: "Nayo",
    name: "Nayo Women Maroon Printed Tunic",
    category: "Tunics",
    image:
      "http://assets.myntassets.com/assets/images/16293016/2021/11/29/17746a6e-f628-438a-859d-2360fae4f6cb1638186787980NayoWomenMaroonPrinted1.jpg",
    link: "tunics/nayo/nayo-women-maroon-printed-tunic/16293016/buy",
    price: 779,
  },
  {
    id: 29130840,
    brand: "Seva Chikan",
    name: "Seva Chikan Ethnic Motifs Three-Quarter Sleeves Round Neck Embroidered Chikankari Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/29130840/2024/4/23/d3266be7-bf83-4c32-93cb-cf9fd890da551713868849130Kurtis1.jpg",
    link: "kurtis/seva+chikan/seva-chikan-ethnic-motifs-three-quarter-sleeves-round-neck-embroidered-chikankari-kurti/29130840/buy",
    price: 1332,
  },
  {
    id: 30504664,
    brand: "KALINI",
    name: "KALINI Geometric Printed Keyhole Neck Puff Sleeves A Line Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/2024/AUGUST/6/zf69Pmzm_c9b00d3fa98b46efa918ad468e61d768.jpg",
    link: "kurtis/kalini/kalini-geometric-printed-keyhole-neck-puff-sleeves-a-line-kurti/30504664/buy",
    price: 659,
  },
  {
    id: 30504895,
    brand: "keshubaba",
    name: "keshubaba V Neck Floral Printed Straight Kurta",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/2024/AUGUST/6/EM87zz0P_bc813bb17222425a99bd8af1556d3c65.jpg",
    link: "kurtis/keshubaba/keshubaba-v-neck-floral-printed-straight-kurta/30504895/buy",
    price: 805,
  },
  {
    id: 25061558,
    brand: "Seva Chikan",
    name: "Seva Chikan Ethnic Motifs Embroidered Chikankari Detail straight Kurti With Slip",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/25061558/2023/9/19/5953b659-dd8f-4451-8fa8-ac3a06052a551695134718922Kurtis1.jpg",
    link: "kurtis/seva+chikan/seva-chikan-ethnic-motifs-embroidered-chikankari-detail-straight-kurti-with-slip/25061558/buy",
    price: 1609,
  },
  {
    id: 30478576,
    brand: "Anouk",
    name: "Anouk Floral Embroidered Mandarin Collar A-Line Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/2024/AUGUST/3/nNTeiWqc_c9fed36ee0ad45ea957f2e739235d40d.jpg",
    link: "kurtis/anouk/anouk-floral-embroidered-mandarin-collar-a-line-kurti/30478576/buy",
    price: 776,
  },
  {
    id: 24216616,
    brand: "MEESAN",
    name: "MEESAN Ethnic Printed Mandarin Collar Cotton Tunic",
    category: "Tunics",
    image:
      "http://assets.myntassets.com/assets/images/24216616/2023/7/26/322bcedb-28db-4c04-b3ec-376d93a1811b1690392732195MEESANBluePrintedTunics1.jpg",
    link: "tunics/meesan/meesan-ethnic-printed-mandarin-collar-cotton-tunic/24216616/buy",
    price: 584,
  },
  {
    id: 29130820,
    brand: "Seva Chikan",
    name: "Seva Chikan Ethnic Motifs Embroidered Georgette Straight Lucknowi Chikankari Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/29130820/2024/4/23/5a437e53-cb65-447d-8c58-186ff6a2409b1713868814530Kurtis1.jpg",
    link: "kurtis/seva+chikan/seva-chikan-ethnic-motifs-embroidered-georgette-straight-lucknowi-chikankari-kurti/29130820/buy",
    price: 1507,
  },
  {
    id: 30478593,
    brand: "Anouk",
    name: "Anouk Floral Embroidered Mandarin Collar Straight Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/2024/AUGUST/3/es4Mmy0b_ca466c5f71024ee1bdf1045c4c334798.jpg",
    link: "kurtis/anouk/anouk-floral-embroidered-mandarin-collar-straight-kurti/30478593/buy",
    price: 739,
  },
  {
    id: 27958180,
    brand: "Anouk",
    name: "Anouk Blue Floral Printed Mandarin Collar Pure Cotton Top",
    category: "Tops",
    image:
      "http://assets.myntassets.com/assets/images/27958180/2024/2/29/cba29f39-54d9-4714-8906-37124bfd2dc11709212267725AnoukWomenFloralPrintedMirrorWorkKurta1.jpg",
    link: "tops/anouk/anouk-blue-floral-printed-mandarin-collar-pure-cotton-top/27958180/buy",
    price: 575,
  },
  {
    id: 29130834,
    brand: "Seva Chikan",
    name: "Seva Chikan Ethnic Motifs Embroidered Notch Neck Straight Lucknowi Chikankari Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/29130834/2024/4/23/615fdcee-2378-4b0f-b8ac-34c45d8808b31713868847357Kurtis1.jpg",
    link: "kurtis/seva+chikan/seva-chikan-ethnic-motifs-embroidered-notch-neck-straight-lucknowi-chikankari-kurti/29130834/buy",
    price: 1575,
  },
  {
    id: 23739746,
    brand: "KALINI",
    name: "KALINI Embroidered Gathered A-Line Tunic",
    category: "Tunics",
    image:
      "http://assets.myntassets.com/assets/images/23739746/2023/6/24/522855fb-fdad-4c3e-a8c4-7a1a674532841687559405955KALINIMaroonWhiteViscoseRayonEmbroideredTunic1.jpg",
    link: "tunics/kalini/kalini-embroidered-gathered-a-line-tunic/23739746/buy",
    price: 619,
  },
  {
    id: 30478592,
    brand: "Anouk",
    name: "Anouk Floral Embroidered Notch Neck A-Line Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/2024/AUGUST/3/7IN3uJqV_80914dd2317f46f3ac26cd12cbf372c0.jpg",
    link: "kurtis/anouk/anouk-floral-embroidered-notch-neck-a-line-kurti/30478592/buy",
    price: 739,
  },
  {
    id: 29130828,
    brand: "Seva Chikan",
    name: "Seva Chikan Floral Printed Thread Work Cotton Straight Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/29130828/2024/4/23/57e3f3fa-6e6d-470e-803f-e5aa76a4fe971713868826087Kurtis1.jpg",
    link: "kurtis/seva+chikan/seva-chikan-floral-printed-thread-work-cotton-straight-kurti/29130828/buy",
    price: 1439,
  },
  {
    id: 30478611,
    brand: "Anouk",
    name: "Anouk Floral Embroidered Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/2024/AUGUST/3/DFKLF6YK_18ceb08ed531410c98e989aa24da074d.jpg",
    link: "kurtis/anouk/anouk-floral-embroidered-kurti/30478611/buy",
    price: 702,
  },
  {
    id: 28032186,
    brand: "Sangria",
    name: "Sangria Pleated Shirt Collar Tunics",
    category: "Tunics",
    image:
      "http://assets.myntassets.com/assets/images/28032186/2024/3/5/2fd90364-0e47-40db-8dff-3bc677053d461709620990214SangriaShirtCollarTunics1.jpg",
    link: "tunics/sangria/sangria-pleated-shirt-collar-tunics/28032186/buy",
    price: 699,
  },
  {
    id: 28940680,
    brand: "LetsDressUp",
    name: "LetsDressUp Floral Printed Kaftan Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/28940680/2024/4/16/0815f9b3-c48c-496c-833c-93c71ad9246c1713258981152Kurtis1.jpg",
    link: "kurtis/letsdressup/letsdressup-floral-printed-kaftan-kurti/28940680/buy",
    price: 899,
  },
  {
    id: 30555900,
    brand: "Melange by Lifestyle",
    name: "Melange by Lifestyle Printed Straight Tunic",
    category: "Tunics",
    image:
      "http://assets.myntassets.com/assets/images/2024/AUGUST/12/xNO4qS0z_8290192edcca4e6899dcc470922692af.jpg",
    link: "tunics/melange+by+lifestyle/melange-by-lifestyle-printed-straight-tunic/30555900/buy",
    price: 499,
  },
  {
    id: 8349555,
    brand: "Sangria",
    name: "Sangria Black & Red Embroidered Tunic",
    category: "Tunics",
    image:
      "http://assets.myntassets.com/assets/images/8349555/2019/5/7/ce4115e7-8c45-421b-8ec9-8b65a89d5e751557209696698-Round-Neck-34th-Sleeves-Solid-Black-Top-With-Embroidered-Yok-1.jpg",
    link: "tunics/sangria/sangria-black--red-embroidered-tunic/8349555/buy",
    price: 859,
  },
  {
    id: 29130832,
    brand: "Seva Chikan",
    name: "Seva Chikan Ethnic Motifs Embroidered Notch Neck Chikankari Straight Kurti With Slip",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/29130832/2024/4/23/204bb5f9-0d57-41a5-8792-b58314aaaf291713868897643Kurtis1.jpg",
    link: "kurtis/seva+chikan/seva-chikan-ethnic-motifs-embroidered-notch-neck-chikankari-straight-kurti-with-slip/29130832/buy",
    price: 1259,
  },
  {
    id: 28032228,
    brand: "Sangria",
    name: "Sangria Self Design Pleated Mandarin Collar Tunics",
    category: "Tunics",
    image:
      "http://assets.myntassets.com/assets/images/28032228/2024/3/5/9143bb47-9594-44ba-a107-b19ac4e22b451709621061140Tunics1.jpg",
    link: "tunics/sangria/sangria-self-design-pleated-mandarin-collar-tunics/28032228/buy",
    price: 699,
  },
  {
    id: 30478605,
    brand: "Anouk",
    name: "Anouk Floral Yoke Design Round Neck A-Line Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/2024/AUGUST/3/eXAqEnX4_adf41588da1749bc941d6b835c309710.jpg",
    link: "kurtis/anouk/anouk-floral-yoke-design-round-neck-a-line-kurti/30478605/buy",
    price: 628,
  },
  {
    id: 25061570,
    brand: "Seva Chikan",
    name: "Seva Chikan Floral Embroidered Chikankari Straight Kurti With Slip",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/25061570/2023/10/18/c795365a-b046-4497-be94-c757fa881f861697623475734-Seva-Chikan-Floral-Embroidered-Chikankari-Straight-Kurti-316-1.jpg",
    link: "kurtis/seva+chikan/seva-chikan-floral-embroidered-chikankari-straight-kurti-with-slip/25061570/buy",
    price: 1609,
  },
  {
    id: 9971487,
    brand: "Vishudh",
    name: "Vishudh Blue & Red Striped Tunic",
    category: "Tunics",
    image:
      "http://assets.myntassets.com/assets/images/productimage/2019/6/10/9d03156b-21c8-4ca3-9454-30b12d3fcde21560150066586-1.jpg",
    link: "tunics/vishudh/vishudh-blue--red-striped-tunic/9971487/buy",
    price: 335,
  },
  {
    id: 28886594,
    brand: "Anouk",
    name: "Anouk V-Neck Regular Sleeves Kurti",
    category: "Kurtis",
    image:
      "http://assets.myntassets.com/assets/images/28886594/2024/4/12/c5d9d5d7-36af-478a-84fb-323c39e28a791712915149334AnoukWomenFlaredSleevesKurta6.jpg",
    link: "kurtis/anouk/anouk-v-neck-regular-sleeves-kurti/28886594/buy",
    price: 719,
  },
];
