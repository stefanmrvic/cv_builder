import Content from './Content/Content.jsx';
import Customize from './Customize/Customize.jsx';

import styles from './MainControls.module.css';

export default function MainControls({data, setCVData, activeTab, order, setOrder, bulletPoints, setBulletPoints}) {
    return (
        <div className={styles.mainControls}>
            {activeTab === 'content' ? (
                <Content data={data} setCVData={setCVData} />
            ) : (
                <Customize 
                    data={data} 
                    setCVData={setCVData} 
                    order={order}
                    setOrder={setOrder}
                    bulletPoints={bulletPoints}
                    setBulletPoints={setBulletPoints}
                />
            )}  
        </div>
    )
}