import Content from './Content.jsx'
import Customize from './Customize.jsx'

import styles from './SideControls.module.css'

export default function SideControls({ activeTab, setActiveTab }) {
    return (
        <div className={styles.sideControls}>
            <nav className={styles.sidebar} aria-label='Tab navigation'>
                <Content 
                    className={activeTab === 'content' ? `${styles.active}`: ''}
                    ariaSelected={activeTab === 'content'}
                    onClick={() => setActiveTab('content')} 
                />
                <Customize 
                    ariaSelected={activeTab === 'customize'}
                    className={activeTab === 'customize' ? `${styles.active}`: ''}
                    onClick={() => setActiveTab('customize')} 
                />
            </nav>
        </div>
    )
}