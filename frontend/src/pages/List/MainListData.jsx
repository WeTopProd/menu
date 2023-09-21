import salads from '../../assets/gif/main/salads.gif'
import snacks from '../../assets/gif/main/snacks.gif'
import beerSnacks from '../../assets/gif/main/beerSnacks.gif'
import soups from '../../assets/gif/main/soups.gif'
import sideDishes from '../../assets/gif/main/sideDishes.gif'
import hotDishes from '../../assets/gif/main/hotDishes.gif'
import paste from '../../assets/gif/main/paste.gif'
import wok from '../../assets/gif/main/wok.gif'
import burger from '../../assets/gif/main/burger.gif'
import pizza from '../../assets/gif/main/pizza.gif'
import khachapuri from '../../assets/gif/main/khachapuri.gif'
import ossetianPies from '../../assets/gif/main/ossetianPies.gif'
import rolls from '../../assets/gif/main/rolls.gif'
import grilledDishes from '../../assets/gif/main/grilledDishes.gif'
import sauces from '../../assets/gif/main/sauces.gif'
import bread from '../../assets/gif/main/bread.gif'
import dessert from '../../assets/gif/main/dessert.gif'
const MainListData = ({subtype, idx}) => {
    const renderSwitch = (subtype) => {
        switch (subtype) {
            case 'Салаты':
                return  <img key={idx} src={salads} alt="gif"/>
            case 'Закуски':
                 return  <img key={idx} src={snacks} alt="gif"/>
            case 'Пивные Закуски':
                 return  <img key={idx} src={beerSnacks} alt="gif"/>
            case 'Супы':
                return  <img key={idx} src={soups} alt="gif"/>
            case 'Гарниры':
                return  <img key={idx} src={sideDishes} alt="gif"/>
            case 'Горячие блюда':
                return  <img key={idx} src={hotDishes} alt="gif"/>
            case 'Паста':
                return  <img key={idx} src={paste} alt="gif"/>
            case 'Вок':
                return  <img key={idx} src={wok} alt="gif"/>
            case 'Бургеры':
                return  <img key={idx} src={burger} alt="gif"/>
            case 'Пицца':
                return  <img key={idx} src={pizza} alt="gif"/>
            case 'Хачапури':
                return  <img key={idx} src={khachapuri} alt="gif"/>
            case 'Осетинские пироги':
                return  <img key={idx} src={ossetianPies} alt="gif"/>
            case 'Роллы':
                return  <img key={idx} src={rolls} alt="gif"/>
            case 'Блюда на мангале':
                return  <img key={idx} src={grilledDishes} alt="gif"/>
            case 'Соусы':
                return  <img key={idx} src={sauces} alt="gif"/>
            case 'Хлеб':
                return  <img key={idx} src={bread} alt="gif"/>
            case 'Десерты':
                return  <img key={idx} src={dessert} alt="gif"/>
            default:
                return  <img key={idx} src={salads} alt="gif"/>
        }
    }
    return (
        renderSwitch(subtype)
    );
};

export default MainListData;
