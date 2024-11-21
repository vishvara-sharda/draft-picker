const heroes = [
  { id: 1, name: "Aamon", img: "/Assets/HeroPick/aamon.png" },
  { id: 2, name: "Akai", img: "/Assets/HeroPick/akai.png" },
  { id: 3, name: "Aldous", img: "/Assets/HeroPick/aldous.png" },
  { id: 4, name: "Alice", img: "/Assets/HeroPick/alice.png" },
  { id: 5, name: "Alpha", img: "/Assets/HeroPick/alpha.png" },
  { id: 6, name: "Alucard", img: "/Assets/HeroPick/alucard.png" },
  { id: 7, name: "Angela", img: "/Assets/HeroPick/angela.png" },
  { id: 8, name: "Argus", img: "/Assets/HeroPick/argus.png" },
  { id: 9, name: "Arlot", img: "/Assets/HeroPick/arlot.png" },
  { id: 10, name: "Atlas", img: "/Assets/HeroPick/atlas.png" },
  { id: 11, name: "Aulus", img: "/Assets/HeroPick/aulus.png" },
  { id: 12, name: "Aurora", img: "/Assets/HeroPick/aurora.png" },
  { id: 13, name: "Badang", img: "/Assets/HeroPick/badang.png" },
  { id: 14, name: "Balmond", img: "/Assets/HeroPick/balmond.png" },
  { id: 15, name: "Bane", img: "/Assets/HeroPick/bane.png" },
  { id: 16, name: "Barats", img: "/Assets/HeroPick/barats.png" },
  { id: 17, name: "Baxia", img: "/Assets/HeroPick/baxia.png" },
  { id: 18, name: "Beatrix", img: "/Assets/HeroPick/beatrix.png" },
  { id: 19, name: "Beleric", img: "/Assets/HeroPick/beleric.png" },
  { id: 20, name: "Benedetta", img: "/Assets/HeroPick/benedetta.png" },
  { id: 21, name: "Brody", img: "/Assets/HeroPick/brody.png" },
  { id: 22, name: "Bruno", img: "/Assets/HeroPick/bruno.png" },
  { id: 23, name: "Carmila", img: "/Assets/HeroPick/carmila.png" },
  { id: 24, name: "Cecilion", img: "/Assets/HeroPick/cecilion.png" },
  { id: 25, name: "Chang'e", img: "/Assets/HeroPick/chang_e.png" },
  { id: 26, name: "Chip", img: "/Assets/HeroPick/chip.png" },
  { id: 27, name: "Chou", img: "/Assets/HeroPick/chou.png" },
  { id: 28, name: "Cici", img: "/Assets/HeroPick/cici.png" },
  { id: 29, name: "Claude", img: "/Assets/HeroPick/claude.png" },
  { id: 30, name: "Clint", img: "/Assets/HeroPick/clint.png" },
  { id: 31, name: "Cyclops", img: "/Assets/HeroPick/cyclops.png" },
  { id: 32, name: "Diggie", img: "/Assets/HeroPick/diggie.png" },
  { id: 33, name: "Dyroth", img: "/Assets/HeroPick/dyroth.png" },
  { id: 34, name: "Edith", img: "/Assets/HeroPick/edith.png" },
  { id: 35, name: "Esmeralda", img: "/Assets/HeroPick/esmeralda.png" },
  { id: 36, name: "Estes", img: "/Assets/HeroPick/estes.png" },
  { id: 37, name: "Eudora", img: "/Assets/HeroPick/eudora.png" },
  { id: 38, name: "Fanny", img: "/Assets/HeroPick/fanny.png" },
  { id: 39, name: "Faramis", img: "/Assets/HeroPick/faramis.png" },
  { id: 40, name: "Floryn", img: "/Assets/HeroPick/floryn.png" },
  { id: 41, name: "Franco", img: "/Assets/HeroPick/franco.png" },
  { id: 42, name: "Fredrin", img: "/Assets/HeroPick/fredrin.png" },
  { id: 43, name: "Freya", img: "/Assets/HeroPick/freya.png" },
  { id: 44, name: "Gatotkaca", img: "/Assets/HeroPick/gatotkaca.png" },
  { id: 45, name: "Gloo", img: "/Assets/HeroPick/gloo.png" },
  { id: 46, name: "Gord", img: "/Assets/HeroPick/gord.png" },
  { id: 47, name: "Granger", img: "/Assets/HeroPick/granger.png" },
  { id: 48, name: "Grock", img: "/Assets/HeroPick/grock.png" },
  { id: 49, name: "Guinevere", img: "/Assets/HeroPick/guinevere.png" },
  { id: 50, name: "Gusion", img: "/Assets/HeroPick/gusion.png" },
  { id: 51, name: "Hanabi", img: "/Assets/HeroPick/hanabi.png" },
  { id: 52, name: "Hanzo", img: "/Assets/HeroPick/hanzo.png" },
  { id: 53, name: "Harith", img: "/Assets/HeroPick/harith.png" },
  { id: 54, name: "Harley", img: "/Assets/HeroPick/harley.png" },
  { id: 55, name: "Hayabusa", img: "/Assets/HeroPick/hayabusa.png" },
  { id: 56, name: "Helcurt", img: "/Assets/HeroPick/helcurt.png" },
  { id: 57, name: "Hilda", img: "/Assets/HeroPick/hilda.png" },
  { id: 58, name: "Hylos", img: "/Assets/HeroPick/hylos.png" },
  { id: 59, name: "Irithel", img: "/Assets/HeroPick/irithel.png" },
  { id: 60, name: "Ixia", img: "/Assets/HeroPick/ixia.png" },
  { id: 61, name: "Jawhead", img: "/Assets/HeroPick/jawhead.png" },
  { id: 62, name: "Johnson", img: "/Assets/HeroPick/johnson.png" },
  { id: 63, name: "Joy", img: "/Assets/HeroPick/joy.png" },
  { id: 64, name: "Julian", img: "/Assets/HeroPick/julian.png" },
  { id: 65, name: "Kadita", img: "/Assets/HeroPick/kadita.png" },
  { id: 66, name: "Kagura", img: "/Assets/HeroPick/kagura.png" },
  { id: 67, name: "Kaja", img: "/Assets/HeroPick/kaja.png" },
  { id: 68, name: "Karina", img: "/Assets/HeroPick/karina.png" },
  { id: 69, name: "Karrie", img: "/Assets/HeroPick/karrie.png" },
  { id: 70, name: "Khaleed", img: "/Assets/HeroPick/khaleed.png" },
  { id: 71, name: "Khufra", img: "/Assets/HeroPick/khufra.png" },
  { id: 72, name: "Kimmy", img: "/Assets/HeroPick/kimmy.png" },
  { id: 73, name: "Lancelot", img: "/Assets/HeroPick/lancelot.png" },
  { id: 74, name: "Lapu Lapu", img: "/Assets/HeroPick/lapulapu.png" },
  { id: 75, name: "Layla", img: "/Assets/HeroPick/layla.png" },
  { id: 76, name: "Leomord", img: "/Assets/HeroPick/leomord.png" },
  { id: 77, name: "Lesley", img: "/Assets/HeroPick/lesley.png" },
  { id: 78, name: "Ling", img: "/Assets/HeroPick/ling.png" },
  { id: 79, name: "Lolita", img: "/Assets/HeroPick/lolita.png" },
  { id: 80, name: "Lunox", img: "/Assets/HeroPick/lunox.png" },
  { id: 81, name: "Luo Yi", img: "/Assets/HeroPick/luoyi.png" },
  { id: 82, name: "Lylia", img: "/Assets/HeroPick/lylia.png" },
  { id: 83, name: "Martis", img: "/Assets/HeroPick/martis.png" },
  { id: 84, name: "Masha", img: "/Assets/HeroPick/masha.png" },
  { id: 85, name: "Mathilda", img: "/Assets/HeroPick/mathilda.png" },
  { id: 86, name: "Melissa", img: "/Assets/HeroPick/melissa.png" },
  { id: 87, name: "Minotaur", img: "/Assets/HeroPick/minotour.png" },
  { id: 88, name: "Minsitthar", img: "/Assets/HeroPick/minsitthar.png" },
  { id: 89, name: "Miya", img: "/Assets/HeroPick/miya.png" },
  { id: 90, name: "Moskov", img: "/Assets/HeroPick/moskov.png" },
  { id: 91, name: "Nana", img: "/Assets/HeroPick/nana.png" },
  { id: 92, name: "Natalia", img: "/Assets/HeroPick/natalia.png" },
  { id: 93, name: "Nathan", img: "/Assets/HeroPick/nathan.png" },
  { id: 94, name: "Nolan", img: "/Assets/HeroPick/nolan.png" },
  { id: 95, name: "Novaria", img: "/Assets/HeroPick/novaria.png" },
  { id: 96, name: "Odette", img: "/Assets/HeroPick/odette.png" },
  { id: 97, name: "Paquito", img: "/Assets/HeroPick/paquito.png" },
  { id: 98, name: "Parsha", img: "/Assets/HeroPick/parsha.png" },
  { id: 99, name: "Phoveus", img: "/Assets/HeroPick/phoveus.png" },
  { id: 100, name: "Popol and Kupa", img: "/Assets/HeroPick/popolandkupa.png" },
  { id: 101, name: "Rafaela", img: "/Assets/HeroPick/rafaela.png" },
  { id: 102, name: "Roger", img: "/Assets/HeroPick/roger.png" },
  { id: 103, name: "Ruby", img: "/Assets/HeroPick/ruby.png" },
  { id: 104, name: "Saber", img: "/Assets/HeroPick/saber.png" },
  { id: 105, name: "Selena", img: "/Assets/HeroPick/selena.png" },
  { id: 106, name: "Silvanna", img: "/Assets/HeroPick/silvanna.png" },
  { id: 107, name: "Sun", img: "/Assets/HeroPick/sun.png" },
  { id: 108, name: "Suyou", img: "/Assets/HeroPick/suyou.png" },
  { id: 109, name: "Terizla", img: "/Assets/HeroPick/terizla.png" },
  { id: 110, name: "Thamuz", img: "/Assets/HeroPick/thamuz.png" },
  { id: 111, name: "Tigreal", img: "/Assets/HeroPick/tigreal.png" },
  { id: 112, name: "Uranus", img: "/Assets/HeroPick/uranus.png" },
  { id: 113, name: "Vale", img: "/Assets/HeroPick/vale.png" },
  { id: 114, name: "Valentina", img: "/Assets/HeroPick/valentina.png" },
  { id: 115, name: "Valir", img: "/Assets/HeroPick/valir.png" },
  { id: 116, name: "Vexana", img: "/Assets/HeroPick/vexana.png" },
  { id: 117, name: "Wanwan", img: "/Assets/HeroPick/wanwan.png" },
  { id: 118, name: "Xavier", img: "/Assets/HeroPick/xavier.png" },
  { id: 119, name: "Xborg", img: "/Assets/HeroPick/xborg.png" },
  { id: 120, name: "Yin", img: "/Assets/HeroPick/yin.png" },
  { id: 121, name: "Yisunshin", img: "/Assets/HeroPick/yisunshin.png" },
  { id: 122, name: "Yuzhong", img: "/Assets/HeroPick/yuzhong.png" },
  { id: 123, name: "Yve", img: "/Assets/HeroPick/yve.png" },
  { id: 124, name: "Zhask", img: "/Assets/HeroPick/zhask.png" },
  { id: 125, name: "Zhuxin", img: "/Assets/HeroPick/zhuxin.png" },
  { id: 126, name: "Zilong", img: "/Assets/HeroPick/zilong.png" },
];

export default heroes;
