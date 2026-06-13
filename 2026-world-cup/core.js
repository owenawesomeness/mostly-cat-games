// Shared 2026 World Cup tournament core: official draw data, FIFA Annex C
// third-place allocation, bracket resolution, WC26~ share-code codec, and the
// ESPN live-results engine. Loaded via <script src> by both
// bracket.html and leader_board.html.

  // ===== Data: 12 groups × 4 teams (official FIFA final draw, 5 Dec 2025) =====
  const GROUPS = {
    A: [
      { name: "Mexico",         flag: "🇲🇽" },
      { name: "South Africa",   flag: "🇿🇦" },
      { name: "South Korea",    flag: "🇰🇷" },
      { name: "Czech Republic", flag: "🇨🇿" },
    ],
    B: [
      { name: "Canada",                 flag: "🇨🇦" },
      { name: "Bosnia and Herzegovina", flag: "🇧🇦" },
      { name: "Qatar",                  flag: "🇶🇦" },
      { name: "Switzerland",            flag: "🇨🇭" },
    ],
    C: [
      { name: "Brazil",   flag: "🇧🇷" },
      { name: "Morocco",  flag: "🇲🇦" },
      { name: "Haiti",    flag: "🇭🇹" },
      { name: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
    ],
    D: [
      { name: "USA",       flag: "🇺🇸" },
      { name: "Paraguay",  flag: "🇵🇾" },
      { name: "Australia", flag: "🇦🇺" },
      { name: "Turkey",    flag: "🇹🇷" },
    ],
    E: [
      { name: "Germany",     flag: "🇩🇪" },
      { name: "Curaçao",     flag: "🇨🇼" },
      { name: "Ivory Coast", flag: "🇨🇮" },
      { name: "Ecuador",     flag: "🇪🇨" },
    ],
    F: [
      { name: "Netherlands", flag: "🇳🇱" },
      { name: "Japan",       flag: "🇯🇵" },
      { name: "Sweden",      flag: "🇸🇪" },
      { name: "Tunisia",     flag: "🇹🇳" },
    ],
    G: [
      { name: "Belgium",     flag: "🇧🇪" },
      { name: "Egypt",       flag: "🇪🇬" },
      { name: "Iran",        flag: "🇮🇷" },
      { name: "New Zealand", flag: "🇳🇿" },
    ],
    H: [
      { name: "Spain",        flag: "🇪🇸" },
      { name: "Cape Verde",   flag: "🇨🇻" },
      { name: "Saudi Arabia", flag: "🇸🇦" },
      { name: "Uruguay",      flag: "🇺🇾" },
    ],
    I: [
      { name: "France",  flag: "🇫🇷" },
      { name: "Senegal", flag: "🇸🇳" },
      { name: "Iraq",    flag: "🇮🇶" },
      { name: "Norway",  flag: "🇳🇴" },
    ],
    J: [
      { name: "Argentina", flag: "🇦🇷" },
      { name: "Algeria",   flag: "🇩🇿" },
      { name: "Austria",   flag: "🇦🇹" },
      { name: "Jordan",    flag: "🇯🇴" },
    ],
    K: [
      { name: "Portugal",   flag: "🇵🇹" },
      { name: "DR Congo",   flag: "🇨🇩" },
      { name: "Uzbekistan", flag: "🇺🇿" },
      { name: "Colombia",   flag: "🇨🇴" },
    ],
    L: [
      { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { name: "Croatia", flag: "🇭🇷" },
      { name: "Ghana",   flag: "🇬🇭" },
      { name: "Panama",  flag: "🇵🇦" },
    ],
  };
  const GROUP_KEYS = Object.keys(GROUPS);

  // ===== FIFA Annex C: 3rd-place team allocation table =====
  // Key: sorted string of 8 groups whose 3rd-place team advances (e.g., "ABDEGIKL")
  // Value: 8-char string giving the 3rd-place group letter for each R32 slot in
  // the column order [1A, 1B, 1D, 1E, 1G, 1I, 1K, 1L] (i.e., match 79, 85, 81, 74, 82, 77, 87, 80).
  // Sourced from Wikipedia's reproduction of FIFA's Annex C (2026 Competition Regulations).
  const ANNEX_C = {"EFGHIJKL":"EJIFHGLK","DFGHIJKL":"HGIDJFLK","DEGHIJKL":"EJIDHGLK","DEFHIJKL":"EJIDHFLK","DEFGIJKL":"EGIDJFLK","DEFGHJKL":"EGJDHFLK","DEFGHIKL":"EGIDHFLK","DEFGHIJL":"EGJDHFLI","DEFGHIJK":"EGJDHFIK","CFGHIJKL":"HGICJFLK","CEGHIJKL":"EJICHGLK","CEFHIJKL":"EJICHFLK","CEFGIJKL":"EGICJFLK","CEFGHJKL":"EGJCHFLK","CEFGHIKL":"EGICHFLK","CEFGHIJL":"EGJCHFLI","CEFGHIJK":"EGJCHFIK","CDGHIJKL":"HGICJDLK","CDFHIJKL":"CJIDHFLK","CDFGIJKL":"CGIDJFLK","CDFGHJKL":"CGJDHFLK","CDFGHIKL":"CGIDHFLK","CDFGHIJL":"CGJDHFLI","CDFGHIJK":"CGJDHFIK","CDEHIJKL":"EJICHDLK","CDEGIJKL":"EGICJDLK","CDEGHJKL":"EGJCHDLK","CDEGHIKL":"EGICHDLK","CDEGHIJL":"EGJCHDLI","CDEGHIJK":"EGJCHDIK","CDEFIJKL":"CJEDIFLK","CDEFHJKL":"CJEDHFLK","CDEFHIKL":"CEIDHFLK","CDEFHIJL":"CJEDHFLI","CDEFHIJK":"CJEDHFIK","CDEFGJKL":"CGEDJFLK","CDEFGIKL":"CGEDIFLK","CDEFGIJL":"CGEDJFLI","CDEFGIJK":"CGEDJFIK","CDEFGHKL":"CGEDHFLK","CDEFGHJL":"CGJDHFLE","CDEFGHJK":"CGJDHFEK","CDEFGHIL":"CGEDHFLI","CDEFGHIK":"CGEDHFIK","CDEFGHIJ":"CGJDHFEI","BFGHIJKL":"HJBFIGLK","BEGHIJKL":"EJIBHGLK","BEFHIJKL":"EJBFIHLK","BEFGIJKL":"EJBFIGLK","BEFGHJKL":"EJBFHGLK","BEFGHIKL":"EGBFIHLK","BEFGHIJL":"EJBFHGLI","BEFGHIJK":"EJBFHGIK","BDGHIJKL":"HJBDIGLK","BDFHIJKL":"HJBDIFLK","BDFGIJKL":"IGBDJFLK","BDFGHJKL":"HGBDJFLK","BDFGHIKL":"HGBDIFLK","BDFGHIJL":"HGBDJFLI","BDFGHIJK":"HGBDJFIK","BDEHIJKL":"EJBDIHLK","BDEGIJKL":"EJBDIGLK","BDEGHJKL":"EJBDHGLK","BDEGHIKL":"EGBDIHLK","BDEGHIJL":"EJBDHGLI","BDEGHIJK":"EJBDHGIK","BDEFIJKL":"EJBDIFLK","BDEFHJKL":"EJBDHFLK","BDEFHIKL":"EIBDHFLK","BDEFHIJL":"EJBDHFLI","BDEFHIJK":"EJBDHFIK","BDEFGJKL":"EGBDJFLK","BDEFGIKL":"EGBDIFLK","BDEFGIJL":"EGBDJFLI","BDEFGIJK":"EGBDJFIK","BDEFGHKL":"EGBDHFLK","BDEFGHJL":"HGBDJFLE","BDEFGHJK":"HGBDJFEK","BDEFGHIL":"EGBDHFLI","BDEFGHIK":"EGBDHFIK","BDEFGHIJ":"HGBDJFEI","BCGHIJKL":"HJBCIGLK","BCFHIJKL":"HJBCIFLK","BCFGIJKL":"IGBCJFLK","BCFGHJKL":"HGBCJFLK","BCFGHIKL":"HGBCIFLK","BCFGHIJL":"HGBCJFLI","BCFGHIJK":"HGBCJFIK","BCEHIJKL":"EJBCIHLK","BCEGIJKL":"EJBCIGLK","BCEGHJKL":"EJBCHGLK","BCEGHIKL":"EGBCIHLK","BCEGHIJL":"EJBCHGLI","BCEGHIJK":"EJBCHGIK","BCEFIJKL":"EJBCIFLK","BCEFHJKL":"EJBCHFLK","BCEFHIKL":"EIBCHFLK","BCEFHIJL":"EJBCHFLI","BCEFHIJK":"EJBCHFIK","BCEFGJKL":"EGBCJFLK","BCEFGIKL":"EGBCIFLK","BCEFGIJL":"EGBCJFLI","BCEFGIJK":"EGBCJFIK","BCEFGHKL":"EGBCHFLK","BCEFGHJL":"HGBCJFLE","BCEFGHJK":"HGBCJFEK","BCEFGHIL":"EGBCHFLI","BCEFGHIK":"EGBCHFIK","BCEFGHIJ":"HGBCJFEI","BCDHIJKL":"HJBCIDLK","BCDGIJKL":"IGBCJDLK","BCDGHJKL":"HGBCJDLK","BCDGHIKL":"HGBCIDLK","BCDGHIJL":"HGBCJDLI","BCDGHIJK":"HGBCJDIK","BCDFIJKL":"CJBDIFLK","BCDFHJKL":"CJBDHFLK","BCDFHIKL":"CIBDHFLK","BCDFHIJL":"CJBDHFLI","BCDFHIJK":"CJBDHFIK","BCDFGJKL":"CGBDJFLK","BCDFGIKL":"CGBDIFLK","BCDFGIJL":"CGBDJFLI","BCDFGIJK":"CGBDJFIK","BCDFGHKL":"CGBDHFLK","BCDFGHJL":"CGBDHFLJ","BCDFGHJK":"HGBCJFDK","BCDFGHIL":"CGBDHFLI","BCDFGHIK":"CGBDHFIK","BCDFGHIJ":"HGBCJFDI","BCDEIJKL":"EJBCIDLK","BCDEHJKL":"EJBCHDLK","BCDEHIKL":"EIBCHDLK","BCDEHIJL":"EJBCHDLI","BCDEHIJK":"EJBCHDIK","BCDEGJKL":"EGBCJDLK","BCDEGIKL":"EGBCIDLK","BCDEGIJL":"EGBCJDLI","BCDEGIJK":"EGBCJDIK","BCDEGHKL":"EGBCHDLK","BCDEGHJL":"HGBCJDLE","BCDEGHJK":"HGBCJDEK","BCDEGHIL":"EGBCHDLI","BCDEGHIK":"EGBCHDIK","BCDEGHIJ":"HGBCJDEI","BCDEFJKL":"CJBDEFLK","BCDEFIKL":"CEBDIFLK","BCDEFIJL":"CJBDEFLI","BCDEFIJK":"CJBDEFIK","BCDEFHKL":"CEBDHFLK","BCDEFHJL":"CJBDHFLE","BCDEFHJK":"CJBDHFEK","BCDEFHIL":"CEBDHFLI","BCDEFHIK":"CEBDHFIK","BCDEFHIJ":"CJBDHFEI","BCDEFGKL":"CGBDEFLK","BCDEFGJL":"CGBDJFLE","BCDEFGJK":"CGBDJFEK","BCDEFGIL":"CGBDEFLI","BCDEFGIK":"CGBDEFIK","BCDEFGIJ":"CGBDJFEI","BCDEFGHL":"CGBDHFLE","BCDEFGHK":"CGBDHFEK","BCDEFGHJ":"HGBCJFDE","BCDEFGHI":"CGBDHFEI","AFGHIJKL":"HJIFAGLK","AEGHIJKL":"EJIAHGLK","AEFHIJKL":"EJIFAHLK","AEFGIJKL":"EJIFAGLK","AEFGHJKL":"EGJFAHLK","AEFGHIKL":"EGIFAHLK","AEFGHIJL":"EGJFAHLI","AEFGHIJK":"EGJFAHIK","ADGHIJKL":"HJIDAGLK","ADFHIJKL":"HJIDAFLK","ADFGIJKL":"IGJDAFLK","ADFGHJKL":"HGJDAFLK","ADFGHIKL":"HGIDAFLK","ADFGHIJL":"HGJDAFLI","ADFGHIJK":"HGJDAFIK","ADEHIJKL":"EJIDAHLK","ADEGIJKL":"EJIDAGLK","ADEGHJKL":"EGJDAHLK","ADEGHIKL":"EGIDAHLK","ADEGHIJL":"EGJDAHLI","ADEGHIJK":"EGJDAHIK","ADEFIJKL":"EJIDAFLK","ADEFHJKL":"HJEDAFLK","ADEFHIKL":"HEIDAFLK","ADEFHIJL":"HJEDAFLI","ADEFHIJK":"HJEDAFIK","ADEFGJKL":"EGJDAFLK","ADEFGIKL":"EGIDAFLK","ADEFGIJL":"EGJDAFLI","ADEFGIJK":"EGJDAFIK","ADEFGHKL":"HGEDAFLK","ADEFGHJL":"HGJDAFLE","ADEFGHJK":"HGJDAFEK","ADEFGHIL":"HGEDAFLI","ADEFGHIK":"HGEDAFIK","ADEFGHIJ":"HGJDAFEI","ACGHIJKL":"HJICAGLK","ACFHIJKL":"HJICAFLK","ACFGIJKL":"IGJCAFLK","ACFGHJKL":"HGJCAFLK","ACFGHIKL":"HGICAFLK","ACFGHIJL":"HGJCAFLI","ACFGHIJK":"HGJCAFIK","ACEHIJKL":"EJICAHLK","ACEGIJKL":"EJICAGLK","ACEGHJKL":"EGJCAHLK","ACEGHIKL":"EGICAHLK","ACEGHIJL":"EGJCAHLI","ACEGHIJK":"EGJCAHIK","ACEFIJKL":"EJICAFLK","ACEFHJKL":"HJECAFLK","ACEFHIKL":"HEICAFLK","ACEFHIJL":"HJECAFLI","ACEFHIJK":"HJECAFIK","ACEFGJKL":"EGJCAFLK","ACEFGIKL":"EGICAFLK","ACEFGIJL":"EGJCAFLI","ACEFGIJK":"EGJCAFIK","ACEFGHKL":"HGECAFLK","ACEFGHJL":"HGJCAFLE","ACEFGHJK":"HGJCAFEK","ACEFGHIL":"HGECAFLI","ACEFGHIK":"HGECAFIK","ACEFGHIJ":"HGJCAFEI","ACDHIJKL":"HJICADLK","ACDGIJKL":"IGJCADLK","ACDGHJKL":"HGJCADLK","ACDGHIKL":"HGICADLK","ACDGHIJL":"HGJCADLI","ACDGHIJK":"HGJCADIK","ACDFIJKL":"CJIDAFLK","ACDFHJKL":"HJFCADLK","ACDFHIKL":"HFICADLK","ACDFHIJL":"HJFCADLI","ACDFHIJK":"HJFCADIK","ACDFGJKL":"CGJDAFLK","ACDFGIKL":"CGIDAFLK","ACDFGIJL":"CGJDAFLI","ACDFGIJK":"CGJDAFIK","ACDFGHKL":"HGFCADLK","ACDFGHJL":"CGJDAFLH","ACDFGHJK":"HGJCAFDK","ACDFGHIL":"HGFCADLI","ACDFGHIK":"HGFCADIK","ACDFGHIJ":"HGJCAFDI","ACDEIJKL":"EJICADLK","ACDEHJKL":"HJECADLK","ACDEHIKL":"HEICADLK","ACDEHIJL":"HJECADLI","ACDEHIJK":"HJECADIK","ACDEGJKL":"EGJCADLK","ACDEGIKL":"EGICADLK","ACDEGIJL":"EGJCADLI","ACDEGIJK":"EGJCADIK","ACDEGHKL":"HGECADLK","ACDEGHJL":"HGJCADLE","ACDEGHJK":"HGJCADEK","ACDEGHIL":"HGECADLI","ACDEGHIK":"HGECADIK","ACDEGHIJ":"HGJCADEI","ACDEFJKL":"CJEDAFLK","ACDEFIKL":"CEIDAFLK","ACDEFIJL":"CJEDAFLI","ACDEFIJK":"CJEDAFIK","ACDEFHKL":"HEFCADLK","ACDEFHJL":"HJFCADLE","ACDEFHJK":"HJECAFDK","ACDEFHIL":"HEFCADLI","ACDEFHIK":"HEFCADIK","ACDEFHIJ":"HJECAFDI","ACDEFGKL":"CGEDAFLK","ACDEFGJL":"CGJDAFLE","ACDEFGJK":"CGJDAFEK","ACDEFGIL":"CGEDAFLI","ACDEFGIK":"CGEDAFIK","ACDEFGIJ":"CGJDAFEI","ACDEFGHL":"HGFCADLE","ACDEFGHK":"HGECAFDK","ACDEFGHJ":"HGJCAFDE","ACDEFGHI":"HGECAFDI","ABGHIJKL":"HJBAIGLK","ABFHIJKL":"HJBAIFLK","ABFGIJKL":"IJBFAGLK","ABFGHJKL":"HJBFAGLK","ABFGHIKL":"HGBAIFLK","ABFGHIJL":"HJBFAGLI","ABFGHIJK":"HJBFAGIK","ABEHIJKL":"EJBAIHLK","ABEGIJKL":"EJBAIGLK","ABEGHJKL":"EJBAHGLK","ABEGHIKL":"EGBAIHLK","ABEGHIJL":"EJBAHGLI","ABEGHIJK":"EJBAHGIK","ABEFIJKL":"EJBAIFLK","ABEFHJKL":"EJBFAHLK","ABEFHIKL":"EIBFAHLK","ABEFHIJL":"EJBFAHLI","ABEFHIJK":"EJBFAHIK","ABEFGJKL":"EJBFAGLK","ABEFGIKL":"EGBAIFLK","ABEFGIJL":"EJBFAGLI","ABEFGIJK":"EJBFAGIK","ABEFGHKL":"EGBFAHLK","ABEFGHJL":"HJBFAGLE","ABEFGHJK":"HJBFAGEK","ABEFGHIL":"EGBFAHLI","ABEFGHIK":"EGBFAHIK","ABEFGHIJ":"HJBFAGEI","ABDHIJKL":"IJBDAHLK","ABDGIJKL":"IJBDAGLK","ABDGHJKL":"HJBDAGLK","ABDGHIKL":"IGBDAHLK","ABDGHIJL":"HJBDAGLI","ABDGHIJK":"HJBDAGIK","ABDFIJKL":"IJBDAFLK","ABDFHJKL":"HJBDAFLK","ABDFHIKL":"HIBDAFLK","ABDFHIJL":"HJBDAFLI","ABDFHIJK":"HJBDAFIK","ABDFGJKL":"FJBDAGLK","ABDFGIKL":"IGBDAFLK","ABDFGIJL":"FJBDAGLI","ABDFGIJK":"FJBDAGIK","ABDFGHKL":"HGBDAFLK","ABDFGHJL":"HGBDAFLJ","ABDFGHJK":"HGBDAFJK","ABDFGHIL":"HGBDAFLI","ABDFGHIK":"HGBDAFIK","ABDFGHIJ":"HGBDAFIJ","ABDEIJKL":"EJBAIDLK","ABDEHJKL":"EJBDAHLK","ABDEHIKL":"EIBDAHLK","ABDEHIJL":"EJBDAHLI","ABDEHIJK":"EJBDAHIK","ABDEGJKL":"EJBDAGLK","ABDEGIKL":"EGBAIDLK","ABDEGIJL":"EJBDAGLI","ABDEGIJK":"EJBDAGIK","ABDEGHKL":"EGBDAHLK","ABDEGHJL":"HJBDAGLE","ABDEGHJK":"HJBDAGEK","ABDEGHIL":"EGBDAHLI","ABDEGHIK":"EGBDAHIK","ABDEGHIJ":"HJBDAGEI","ABDEFJKL":"EJBDAFLK","ABDEFIKL":"EIBDAFLK","ABDEFIJL":"EJBDAFLI","ABDEFIJK":"EJBDAFIK","ABDEFHKL":"HEBDAFLK","ABDEFHJL":"HJBDAFLE","ABDEFHJK":"HJBDAFEK","ABDEFHIL":"HEBDAFLI","ABDEFHIK":"HEBDAFIK","ABDEFHIJ":"HJBDAFEI","ABDEFGKL":"EGBDAFLK","ABDEFGJL":"EGBDAFLJ","ABDEFGJK":"EGBDAFJK","ABDEFGIL":"EGBDAFLI","ABDEFGIK":"EGBDAFIK","ABDEFGIJ":"EGBDAFIJ","ABDEFGHL":"HGBDAFLE","ABDEFGHK":"HGBDAFEK","ABDEFGHJ":"HGBDAFEJ","ABDEFGHI":"HGBDAFEI","ABCHIJKL":"IJBCAHLK","ABCGIJKL":"IJBCAGLK","ABCGHJKL":"HJBCAGLK","ABCGHIKL":"IGBCAHLK","ABCGHIJL":"HJBCAGLI","ABCGHIJK":"HJBCAGIK","ABCFIJKL":"IJBCAFLK","ABCFHJKL":"HJBCAFLK","ABCFHIKL":"HIBCAFLK","ABCFHIJL":"HJBCAFLI","ABCFHIJK":"HJBCAFIK","ABCFGJKL":"CJBFAGLK","ABCFGIKL":"IGBCAFLK","ABCFGIJL":"CJBFAGLI","ABCFGIJK":"CJBFAGIK","ABCFGHKL":"HGBCAFLK","ABCFGHJL":"HGBCAFLJ","ABCFGHJK":"HGBCAFJK","ABCFGHIL":"HGBCAFLI","ABCFGHIK":"HGBCAFIK","ABCFGHIJ":"HGBCAFIJ","ABCEIJKL":"EJBAICLK","ABCEHJKL":"EJBCAHLK","ABCEHIKL":"EIBCAHLK","ABCEHIJL":"EJBCAHLI","ABCEHIJK":"EJBCAHIK","ABCEGJKL":"EJBCAGLK","ABCEGIKL":"EGBAICLK","ABCEGIJL":"EJBCAGLI","ABCEGIJK":"EJBCAGIK","ABCEGHKL":"EGBCAHLK","ABCEGHJL":"HJBCAGLE","ABCEGHJK":"HJBCAGEK","ABCEGHIL":"EGBCAHLI","ABCEGHIK":"EGBCAHIK","ABCEGHIJ":"HJBCAGEI","ABCEFJKL":"EJBCAFLK","ABCEFIKL":"EIBCAFLK","ABCEFIJL":"EJBCAFLI","ABCEFIJK":"EJBCAFIK","ABCEFHKL":"HEBCAFLK","ABCEFHJL":"HJBCAFLE","ABCEFHJK":"HJBCAFEK","ABCEFHIL":"HEBCAFLI","ABCEFHIK":"HEBCAFIK","ABCEFHIJ":"HJBCAFEI","ABCEFGKL":"EGBCAFLK","ABCEFGJL":"EGBCAFLJ","ABCEFGJK":"EGBCAFJK","ABCEFGIL":"EGBCAFLI","ABCEFGIK":"EGBCAFIK","ABCEFGIJ":"EGBCAFIJ","ABCEFGHL":"HGBCAFLE","ABCEFGHK":"HGBCAFEK","ABCEFGHJ":"HGBCAFEJ","ABCEFGHI":"HGBCAFEI","ABCDIJKL":"IJBCADLK","ABCDHJKL":"HJBCADLK","ABCDHIKL":"HIBCADLK","ABCDHIJL":"HJBCADLI","ABCDHIJK":"HJBCADIK","ABCDGJKL":"CJBDAGLK","ABCDGIKL":"IGBCADLK","ABCDGIJL":"CJBDAGLI","ABCDGIJK":"CJBDAGIK","ABCDGHKL":"HGBCADLK","ABCDGHJL":"HGBCADLJ","ABCDGHJK":"HGBCADJK","ABCDGHIL":"HGBCADLI","ABCDGHIK":"HGBCADIK","ABCDGHIJ":"HGBCADIJ","ABCDFJKL":"CJBDAFLK","ABCDFIKL":"CIBDAFLK","ABCDFIJL":"CJBDAFLI","ABCDFIJK":"CJBDAFIK","ABCDFHKL":"HFBCADLK","ABCDFHJL":"CJBDAFLH","ABCDFHJK":"HJBCAFDK","ABCDFHIL":"HFBCADLI","ABCDFHIK":"HFBCADIK","ABCDFHIJ":"HJBCAFDI","ABCDFGKL":"CGBDAFLK","ABCDFGJL":"CGBDAFLJ","ABCDFGJK":"CGBDAFJK","ABCDFGIL":"CGBDAFLI","ABCDFGIK":"CGBDAFIK","ABCDFGIJ":"CGBDAFIJ","ABCDFGHL":"CGBDAFLH","ABCDFGHK":"HGBCAFDK","ABCDFGHJ":"HGBCAFDJ","ABCDFGHI":"HGBCAFDI","ABCDEJKL":"EJBCADLK","ABCDEIKL":"EIBCADLK","ABCDEIJL":"EJBCADLI","ABCDEIJK":"EJBCADIK","ABCDEHKL":"HEBCADLK","ABCDEHJL":"HJBCADLE","ABCDEHJK":"HJBCADEK","ABCDEHIL":"HEBCADLI","ABCDEHIK":"HEBCADIK","ABCDEHIJ":"HJBCADEI","ABCDEGKL":"EGBCADLK","ABCDEGJL":"EGBCADLJ","ABCDEGJK":"EGBCADJK","ABCDEGIL":"EGBCADLI","ABCDEGIK":"EGBCADIK","ABCDEGIJ":"EGBCADIJ","ABCDEGHL":"HGBCADLE","ABCDEGHK":"HGBCADEK","ABCDEGHJ":"HGBCADEJ","ABCDEGHI":"HGBCADEI","ABCDEFKL":"CEBDAFLK","ABCDEFJL":"CJBDAFLE","ABCDEFJK":"CJBDAFEK","ABCDEFIL":"CEBDAFLI","ABCDEFIK":"CEBDAFIK","ABCDEFIJ":"CJBDAFEI","ABCDEFHL":"HFBCADLE","ABCDEFHK":"HEBCAFDK","ABCDEFHJ":"HJBCAFDE","ABCDEFHI":"HEBCAFDI","ABCDEFGL":"CGBDAFLE","ABCDEFGK":"CGBDAFEK","ABCDEFGJ":"CGBDAFEJ","ABCDEFGI":"CGBDAFEI","ABCDEFGH":"HGBCAFDE"};

  // Slot column order used in the Annex C value strings (corresponds to matches 79,85,81,74,82,77,87,80)
  const ANNEX_C_SLOTS = "ABDEGIKL";

  // ===== R32 fixtures (16 matches), per FIFA's published 2026 schedule =====
  // Slot kinds: w=winner, ru=runner-up, third (assigned via Annex C anchored to a group letter)
  const W  = (g) => ({ kind: "w",  group: g });
  const RU = (g) => ({ kind: "ru", group: g });
  const T  = (g) => ({ kind: "third", anchor: g });
  const R32 = [
    { num: 73, a: RU("A"), b: RU("B") },
    { num: 74, a: W("E"),  b: T("E")  },
    { num: 75, a: W("F"),  b: RU("C") },
    { num: 76, a: W("C"),  b: RU("F") },
    { num: 77, a: W("I"),  b: T("I")  },
    { num: 78, a: RU("E"), b: RU("I") },
    { num: 79, a: W("A"),  b: T("A")  },
    { num: 80, a: W("L"),  b: T("L")  },
    { num: 81, a: W("D"),  b: T("D")  },
    { num: 82, a: W("G"),  b: T("G")  },
    { num: 83, a: RU("K"), b: RU("L") },
    { num: 84, a: W("H"),  b: RU("J") },
    { num: 85, a: W("B"),  b: T("B")  },
    { num: 86, a: W("J"),  b: RU("H") },
    { num: 87, a: W("K"),  b: T("K")  },
    { num: 88, a: RU("D"), b: RU("G") },
  ];

  // Knockout tree (Round of 16 → Final). Source is winner of two earlier matches.
  const R16 = [
    { num: 89, a: 73, b: 75 },
    { num: 90, a: 74, b: 77 },
    { num: 91, a: 76, b: 78 },
    { num: 92, a: 79, b: 80 },
    { num: 93, a: 83, b: 84 },
    { num: 94, a: 81, b: 82 },
    { num: 95, a: 86, b: 88 },
    { num: 96, a: 85, b: 87 },
  ];
  const QF = [
    { num: 97,  a: 89, b: 90 },
    { num: 98,  a: 93, b: 94 },
    { num: 99,  a: 91, b: 92 },
    { num: 100, a: 95, b: 96 },
  ];
  const SF = [
    { num: 101, a: 97, b: 98 },
    { num: 102, a: 99, b: 100 },
  ];
  const FINAL = { num: 104, a: 101, b: 102 };

  const ROUND_COLUMNS = [
    { title: "Round of 32",   matches: R32 },
    { title: "Round of 16",   matches: R16 },
    { title: "Quarterfinals", matches: QF  },
    { title: "Semifinals",    matches: SF  },
    { title: "Final",         matches: [FINAL] },
  ];

  // The fixtures above are listed by FIFA match number, but a bracket only lines
  // up if each match sits vertically between its two feeders. Reorder every column
  // by a depth-first walk of the tree from the Final down (left subtree before
  // right), so feeders are always adjacent. Logic/data are untouched — display only.
  const MATCH_BY_NUM = {};
  [...R32, ...R16, ...QF, ...SF, FINAL].forEach(m => { MATCH_BY_NUM[m.num] = m; });
  const ROUND_OF = {};
  ROUND_COLUMNS.forEach((col, i) => col.matches.forEach(m => { ROUND_OF[m.num] = i; }));

  const BRACKET_COLUMNS = (() => {
    const perRound = ROUND_COLUMNS.map(() => []);
    const visit = (m) => {
      // R32 matches are leaves (their feeders are slot objects, not match numbers).
      if (typeof m.a !== "object") {
        visit(MATCH_BY_NUM[m.a]);
        visit(MATCH_BY_NUM[m.b]);
      }
      perRound[ROUND_OF[m.num]].push(m);
    };
    visit(FINAL);
    return ROUND_COLUMNS.map((col, i) => ({ title: col.title, matches: perRound[i] }));
  })();

  function blankState() {
    return {
      name: "",
      groupPicks: Object.fromEntries(GROUP_KEYS.map(g => [g, [null, null]])),
      wildcards: Object.fromEntries(GROUP_KEYS.map(g => [g, null])),
      knockout: {},
    };
  }

  // ===== Helpers =====
  function findTeamByName(name) {
    if (!name) return null;
    for (const g of GROUP_KEYS) {
      const t = GROUPS[g].find(x => x.name === name);
      if (t) return t;
    }
    return null;
  }

  // Returns the team name in a given R32 slot, or null if not yet determined.
  function resolveR32Slot(slot, st = state) {
    if (slot.kind === "w")  return st.groupPicks[slot.group][0];
    if (slot.kind === "ru") return st.groupPicks[slot.group][1];
    if (slot.kind === "third") {
      const advancing = GROUP_KEYS.filter(g => st.wildcards[g]);
      if (advancing.length !== 8) return null;
      const key = advancing.slice().sort().join("");
      const lookup = ANNEX_C[key];
      if (!lookup) return null;
      const idx = ANNEX_C_SLOTS.indexOf(slot.anchor);
      const sourceGroup = lookup[idx];
      return st.wildcards[sourceGroup];
    }
    return null;
  }

  // Returns [teamNameA, teamNameB] for a given match number, or [null, null] if undetermined.
  function teamsForMatch(num, st = state) {
    const r32 = R32.find(m => m.num === num);
    if (r32) return [resolveR32Slot(r32.a, st), resolveR32Slot(r32.b, st)];
    const later = [...R16, ...QF, ...SF, FINAL].find(m => m.num === num);
    if (!later) return [null, null];
    return [st.knockout[later.a] || null, st.knockout[later.b] || null];
  }

  // Slot description for empty cells (e.g., "Winner A", "Runner-up B", "3rd place")
  function slotLabel(slot) {
    if (slot.kind === "w")     return `Winner ${slot.group}`;
    if (slot.kind === "ru")    return `Runner-up ${slot.group}`;
    if (slot.kind === "third") return `3rd place`;
    return "TBD";
  }

  function feedLabel(prevMatchNum) {
    return `Winner of Match ${prevMatchNum}`;
  }

  const SHARE_PREFIX = "WC26~";

  // All knockout matches in dependency order (each round feeds the next), so a
  // decoder can resolve matchups round-by-round before reading the next round.
  const ALL_KO = [...R32, ...R16, ...QF, ...SF, FINAL];

  // Compact share format (v2): a positional string of team *indices* (0-3) rather
  // than full names. Layout: "2" + 24 group-pick chars + 12 wildcard chars +
  // 31 knockout chars ('.'/'a'/'b' = none/sideA/sideB). The picker's name is NOT
  // in here — exportCode prepends it in readable form, before the base64 blob.
  function encodeCompact(st) {
    const idxChar = (groupKey, name) => {
      const i = name ? GROUPS[groupKey].findIndex(t => t.name === name) : -1;
      return i >= 0 ? String(i) : ".";
    };
    let s = "2";
    GROUP_KEYS.forEach(g => { s += idxChar(g, st.groupPicks[g][0]) + idxChar(g, st.groupPicks[g][1]); });
    GROUP_KEYS.forEach(g => { s += idxChar(g, st.wildcards[g]); });
    ALL_KO.forEach(m => {
      const w = st.knockout[m.num];
      if (!w) { s += "."; return; }
      const [a, b] = teamsForMatch(m.num, st);
      s += w === a ? "a" : (w === b ? "b" : ".");
    });
    return s;
  }

  function decodeCompact(payload) {
    const st = blankState();
    const body = payload.slice(1); // drop version char
    const nl = body.indexOf("\n");
    const fixed = nl >= 0 ? body.slice(0, nl) : body;
    st.name = nl >= 0 ? body.slice(nl + 1) : "";
    let i = 0;
    const next = () => fixed[i++];
    const teamAt = (groupKey, ch) => (ch >= "0" && ch <= "3") ? GROUPS[groupKey][Number(ch)].name : null;
    GROUP_KEYS.forEach(g => { st.groupPicks[g] = [teamAt(g, next()), teamAt(g, next())]; });
    GROUP_KEYS.forEach(g => { st.wildcards[g] = teamAt(g, next()); });
    ALL_KO.forEach(m => {
      const ch = next();
      if (ch === "a" || ch === "b") {
        const [a, b] = teamsForMatch(m.num, st); // feeders already decoded (dependency order)
        const team = ch === "a" ? a : b;
        if (team) st.knockout[m.num] = team;
      }
    });
    return st;
  }

  // Accepts a WC26~ code (compact v2, optionally name-prefixed, or legacy JSON)
  // or raw JSON (downloaded file). Returns a validated state, or null.
  function parseImport(text) {
    let raw = (text || "").trim();
    if (!raw) return null;
    if (raw.startsWith(SHARE_PREFIX)) raw = raw.slice(SHARE_PREFIX.length).trim();
    const asJson = (str) => {
      try {
        const parsed = JSON.parse(str);
        if (parsed && parsed.groupPicks && parsed.wildcards && parsed.knockout) return parsed;
      } catch (e) {}
      return null;
    };
    if (raw.startsWith("{")) return asJson(raw); // downloaded JSON file
    // Optional readable name prefix: "<name>~<base64>". base64 never contains
    // "~", so the LAST "~" is always the name/picks boundary.
    let externalName = null;
    const cut = raw.lastIndexOf("~");
    if (cut >= 0) {
      externalName = raw.slice(0, cut).trim();
      raw = raw.slice(cut + 1).trim();
    }
    let payload;
    try {
      payload = decodeURIComponent(atob(raw));
    } catch (e) {
      return null;
    }
    let parsed;
    try {
      parsed = payload.startsWith("2") ? decodeCompact(payload) : asJson(payload);
    } catch (e) {
      return null;
    }
    if (!parsed) return null;
    if (externalName !== null) parsed.name = externalName;
    return parsed;
  }

  // ===== Live results (ESPN public scoreboard — free, no API key) =====
  const RESULTS_KEY = "wc2026-actual-results-v1";
  const RESULTS_MODE_KEY = "wc2026-show-results";
  // Whole tournament window in one call; completed games carry final scores.
  const ESPN_SCOREBOARD =
    "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260719&limit=400";

  // ESPN display names that differ from ours (keys are normalized: lowercase,
  // diacritics and punctuation stripped).
  const TEAM_ALIASES = {
    unitedstates: "USA", unitedstatesofamerica: "USA",
    korearepublic: "South Korea",
    czechia: "Czech Republic",
    turkiye: "Turkey",
    cotedivoire: "Ivory Coast",
    caboverde: "Cape Verde", capeverdeislands: "Cape Verde",
    congodr: "DR Congo", democraticrepublicofthecongo: "DR Congo", congokinshasa: "DR Congo",
    bosniaherzegovina: "Bosnia and Herzegovina",
    iriran: "Iran",
    holland: "Netherlands",
  };
  function normName(s) {
    // NFD splits accented letters into base + combining mark; the strip of
    // everything outside [a-z0-9] then drops the marks ("Curaçao" → "curacao").
    return (s || "").normalize("NFD").toLowerCase().replace(/[^a-z0-9]/g, "");
  }
  const TEAM_BY_NORM = {};
  const GROUP_OF = {};
  GROUP_KEYS.forEach(g => GROUPS[g].forEach(t => {
    TEAM_BY_NORM[normName(t.name)] = t.name;
    GROUP_OF[t.name] = g;
  }));
  function canonicalTeam(espnName) {
    const n = normName(espnName);
    return TEAM_ALIASES[n] || TEAM_BY_NORM[n] || null;
  }

  // Flatten ESPN's scoreboard events into plain match records using our team names.
  function parseEvents(json) {
    const out = [];
    (json.events || []).forEach(ev => {
      const comp = ev.competitions && ev.competitions[0];
      if (!comp) return;
      const cs = comp.competitors || [];
      if (cs.length !== 2) return;
      const sides = cs.map(c => ({
        name: canonicalTeam(c.team && (c.team.displayName || c.team.name)),
        score: Number(c.score),
        winner: c.winner === true,
      }));
      if (!sides[0].name || !sides[1].name) return; // team we can't map — skip, never guess
      const stype = (comp.status && comp.status.type) || {};
      const note = (comp.notes || []).map(n => n.headline || n.text || "").join(" ");
      out.push({
        date: ev.date || "", completed: !!stype.completed,
        state: stype.state || "", // "pre" | "in" | "post"
        note, a: sides[0], b: sides[1],
      });
    });
    return out;
  }

  // Group-stage classifier: trust ESPN's stage note when present, else fall back
  // to "same group + played during the group-stage window".
  function isGroupMatch(m) {
    if (/group/i.test(m.note)) return true;
    if (/round of|quarter|semi|final|knockout/i.test(m.note)) return false;
    return GROUP_OF[m.a.name] === GROUP_OF[m.b.name] && m.date.slice(0, 10) < "2026-06-30";
  }

  function groupTables(groupMatches) {
    const tables = {};
    GROUP_KEYS.forEach(g => {
      tables[g] = {};
      GROUPS[g].forEach(t => { tables[g][t.name] = { played: 0, pts: 0, gf: 0, ga: 0 }; });
    });
    groupMatches.forEach(m => {
      if (!m.completed) return;
      const g = GROUP_OF[m.a.name];
      if (g !== GROUP_OF[m.b.name]) return;
      const A = tables[g][m.a.name], B = tables[g][m.b.name];
      A.played++; B.played++;
      A.gf += m.a.score; A.ga += m.b.score;
      B.gf += m.b.score; B.ga += m.a.score;
      if (m.a.score > m.b.score) A.pts += 3;
      else if (m.b.score > m.a.score) B.pts += 3;
      else { A.pts++; B.pts++; }
    });
    return tables;
  }

  // FIFA ranking: points → GD → goals scored, then head-to-head (same three
  // stats) among still-tied clusters. Fair play / lots can't be computed here.
  function rankGroup(g, table, groupMatches) {
    const cmp = (x, y) => {
      const a = table[x], b = table[y];
      return (b.pts - a.pts) || ((b.gf - b.ga) - (a.gf - a.ga)) || (b.gf - a.gf);
    };
    const order = GROUPS[g].map(t => t.name).sort(cmp);
    for (let i = 0; i < order.length;) {
      let j = i + 1;
      while (j < order.length && cmp(order[i], order[j]) === 0) j++;
      if (j - i > 1) {
        const cluster = order.slice(i, j);
        const mini = {};
        cluster.forEach(n => { mini[n] = { pts: 0, gf: 0, ga: 0 }; });
        groupMatches.forEach(m => {
          if (!m.completed || !cluster.includes(m.a.name) || !cluster.includes(m.b.name)) return;
          mini[m.a.name].gf += m.a.score; mini[m.a.name].ga += m.b.score;
          mini[m.b.name].gf += m.b.score; mini[m.b.name].ga += m.a.score;
          if (m.a.score > m.b.score) mini[m.a.name].pts += 3;
          else if (m.b.score > m.a.score) mini[m.b.name].pts += 3;
          else { mini[m.a.name].pts++; mini[m.b.name].pts++; }
        });
        cluster.sort((x, y) => (mini[y].pts - mini[x].pts)
          || ((mini[y].gf - mini[y].ga) - (mini[x].gf - mini[x].ga))
          || (mini[y].gf - mini[x].gf) || x.localeCompare(y));
        order.splice(i, j - i, ...cluster);
      }
      i = j;
    }
    return order;
  }

  // Build the "actual" tournament in the same shape as a user's picks, so all
  // the existing slot-resolution machinery (Annex C, teamsForMatch) just works.
  function buildActual(matches) {
    const groupMs = matches.filter(isGroupMatch);
    const koMs = matches.filter(m => !isGroupMatch(m) && m.completed);
    const tables = groupTables(groupMs);

    const actual = blankState();
    const actualGroups = {};
    const thirds = [];
    GROUP_KEYS.forEach(g => {
      const complete = GROUPS[g].every(t => tables[g][t.name].played >= 3);
      const order = rankGroup(g, tables[g], groupMs);
      actualGroups[g] = { complete, order };
      if (complete) {
        actual.groupPicks[g] = [order[0], order[1]];
        thirds.push({ g, name: order[2], ...tables[g][order[2]] });
      }
    });
    const allGroupsDone = GROUP_KEYS.every(g => actualGroups[g].complete);
    if (allGroupsDone) {
      thirds.sort((x, y) => (y.pts - x.pts) || ((y.gf - y.ga) - (x.gf - x.ga))
        || (y.gf - x.gf) || x.name.localeCompare(y.name));
      thirds.slice(0, 8).forEach(t => { actual.wildcards[t.g] = t.name; });
    }

    // Knockout: walk matches in dependency order; each resolved winner lets
    // teamsForMatch resolve the next round's pairings.
    const actualMatches = {};
    if (allGroupsDone) {
      ALL_KO.forEach(mm => {
        const [a, b] = teamsForMatch(mm.num, actual);
        if (!a || !b) return;
        const ev = koMs.find(m =>
          (m.a.name === a && m.b.name === b) || (m.a.name === b && m.b.name === a));
        if (!ev) return;
        let w = null;
        if (ev.a.winner) w = ev.a.name;
        else if (ev.b.winner) w = ev.b.name;
        else if (ev.a.score > ev.b.score) w = ev.a.name;
        else if (ev.b.score > ev.a.score) w = ev.b.name;
        if (!w) return; // drawn with no shootout winner reported — leave undecided
        actual.knockout[mm.num] = w;
        actualMatches[mm.num] = { a: ev.a.name, b: ev.b.name, sa: ev.a.score, sb: ev.b.score, winner: w };
      });
    }
    const koDone = koMs.length;
    const groupDone = groupMs.filter(m => m.completed).length;
    return { actual, actualGroups, actualMatches, allGroupsDone, groupDone, koDone };
  }

  // Escalating points: each round is worth up to 32 (192 total). Knockout credit
  // is path-independent — your team scores for a round if it really advanced,
  // even if it got there through a different matchup than you predicted.
  function scoreBracket(st, R) {
    const rounds = [];
    let groupPts = 0;
    GROUP_KEYS.forEach(g => {
      const ag = R.actualGroups[g];
      if (!ag || !ag.complete) return;
      const top2 = [ag.order[0], ag.order[1]];
      st.groupPicks[g].forEach(p => { if (p && top2.includes(p)) groupPts++; });
    });
    rounds.push({ label: "Groups", pts: groupPts, max: 24 });
    let wcPts = 0;
    if (R.allGroupsDone) {
      const actualWc = new Set(GROUP_KEYS.map(g => R.actual.wildcards[g]).filter(Boolean));
      GROUP_KEYS.forEach(g => { if (st.wildcards[g] && actualWc.has(st.wildcards[g])) wcPts++; });
    }
    rounds.push({ label: "3rd place", pts: wcPts, max: 8 });
    const KO_ROUNDS = [
      { label: "Rd of 32", ms: R32, pp: 2 },
      { label: "Rd of 16", ms: R16, pp: 4 },
      { label: "Quarters", ms: QF, pp: 8 },
      { label: "Semis", ms: SF, pp: 16 },
      { label: "Champion", ms: [FINAL], pp: 32 },
    ];
    KO_ROUNDS.forEach(r => {
      const winners = new Set(r.ms.map(m => R.actual.knockout[m.num]).filter(Boolean));
      let pts = 0;
      r.ms.forEach(m => { const p = st.knockout[m.num]; if (p && winners.has(p)) pts += r.pp; });
      rounds.push({ label: r.label, pts, max: r.ms.length * r.pp });
    });
    return rounds;
  }

  // Round label for knockout games ESPN hasn't finished yet (no winner to map to
  // a FIFA match number). Cutoffs sit in the rest days between rounds (midday UTC)
  // so late-night games that roll past midnight UTC still label correctly.
  function koRoundLabel(m) {
    if (m.date < "2026-07-04T12") return "Round of 32";
    if (m.date < "2026-07-08T12") return "Round of 16";
    if (m.date < "2026-07-12T12") return "Quarterfinals";
    if (m.date < "2026-07-16T12") return "Semifinals";
    if (m.date < "2026-07-19T00") return "Third place";
    return "Final";
  }
