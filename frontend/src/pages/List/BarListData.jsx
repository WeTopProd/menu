import shots from '../../assets/gif/bar/shots.gif'
import cocktails from '../../assets/gif/bar/cocktails.gif'
import appetizers from '../../assets/gif/bar/appetizers.gif'
import wine from '../../assets/gif/bar/wine.gif'
import whiskey from '../../assets/gif/bar/whiskey.gif'
import vodka from '../../assets/gif/bar/vodka.gif'
import gin from '../../assets/gif/bar/gin.gif'
import cognac from '../../assets/gif/bar/cognac.gif'
import rum from '../../assets/gif/bar/rum.gif'
import tequila from '../../assets/gif/bar/tequila.gif'
import beerSnacks from '../../assets/gif/bar/beerSnacks.gif'
import beverages from '../../assets/gif/bar/beverages.gif'
import tea from '../../assets/gif/bar/tea.gif'
import coffee from '../../assets/gif/bar/coffee.gif'

const BarListData = ({subtype, idx}) => {
    const renderSwitch = (subtype) => {
        switch (subtype) {
            case 'Шоты':
                return  <img key={idx} src={shots} alt="gif"/>
            case 'Коктейли':
                 return  <img key={idx} src={cocktails} alt="gif"/>
            case 'Апперетивы':
                 return  <img key={idx} src={appetizers} alt="gif"/>
            case 'Вина':
                return  <img key={idx} src={wine} alt="gif"/>
            case 'Виски':
                return  <img key={idx} src={whiskey} alt="gif"/>
            case 'Водка':
                return  <img key={idx} src={vodka} alt="gif"/>
            case 'Джин':
                return  <img key={idx} src={gin} alt="gif"/>
            case 'Коньяк':
                return  <img key={idx} src={cognac} alt="gif"/>
            case 'Ром':
                return  <img key={idx} src={rum} alt="gif"/>
            case 'Текила':
                return  <img key={idx} src={tequila} alt="gif"/>
            case 'Пиво':
                return  <img key={idx} src={beerSnacks} alt="gif"/>
            case 'Напитки':
                return  <img key={idx} src={beverages} alt="gif"/>
            case 'чай':
                return  <img key={idx} src={tea} alt="gif"/>
            case 'кофе':
                return  <img key={idx} src={coffee} alt="gif"/>
            default:
                return  <img key={idx} src={beverages} alt="gif"/>
        }
    }
    return (
        renderSwitch(subtype)
    );
};

export default BarListData;
