import React, { useState, useEffect } from 'react'
import style from './Header.module.scss'
import filter from '../../assets/filter.png'
import { useTranslation } from 'react-i18next'

const Header = ({ products, value, setValue, setCategory, setRegion }) => {
    const [open, setOpen] = useState(false)
    const [categoryList, setCategoryList] = useState()
    const [regionList, setRegionList] = useState()
    const {t} = useTranslation()
    if (!products) return <p>Loading..</p>

    useEffect(() => {
        const getCategories = () => {
            try {
                fetch('https://skateboardjumpers.agency/internal/category', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return res.json();
                    })
                    .then(data => {
                        setCategoryList(data);
                    })
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getCategories()
    }, [])

    useEffect(() => {
        const getRegions = () => {
            try {
                fetch('https://skateboardjumpers.agency/internal/region', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return res.json();
                    })
                    .then(data => {
                        setRegionList(data);
                    })
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getRegions()
    }, [])

    const handleCategoryChange = (category, checked) => {
        if (checked) {
            setCategory(prevList => [...prevList, category]);
        } else {
            setCategory(prevList => prevList.filter(cat => cat !== category));
        }
    };

    const handleRegionChange = (region, checked) => {
        if (checked) {
            setRegion(prevList => [...prevList, region]);
        } else {
            setRegion(prevList => prevList.filter(cat => cat !== region));
        }
    };

    return (
        <div className={style.header}>
            <div className={style.filtersDiv}>
                <div className={style.container} onClick={() => setOpen((prev) => !prev)}>
                    <img src={filter} alt="/" />
                </div>
            </div>
            {
                open && (
                    <div className={style.filterContainer}>
                        <div className={style.wrapper}>
                            <div className={style.categoryList}>
                                <p>{t("category")}</p>
                                {
                                    categoryList ? (
                                        categoryList.map((item, i) => (
                                            <div key={i}>
                                                <input
                                                    type="checkbox"
                                                    id={`category-${i}`}
                                                    name={`category-${i}`}
                                                    value={item.category}
                                                    className={style.checkbox}
                                                    onChange={(e) => handleCategoryChange(e.target.value, e.target.checked)}
                                                />
                                                <label htmlFor={`category-${i}`}>{item.category}</label>
                                            </div>
                                        ))
                                    ) : <p>loading..</p>
                                }
                            </div>
                            <div className={style.regionList}>
                                <p>{t("regions")}</p>
                                {
                                    regionList ? (
                                        regionList.map((item, i) => (
                                            <div key={i}>
                                                <input
                                                    type="checkbox"
                                                    id={`region-${i}`}
                                                    className={style.checkbox}
                                                    value={item.region}
                                                    onChange={(e) => handleRegionChange(e.target.value, e.target.checked)}
                                                />
                                                <label htmlFor={`region-${i}`}>{item.region}</label>
                                            </div>
                                        ))
                                    ) : <p>loading..</p>
                                }
                            </div>
                            <button className={style.saveBtn}>{t("automatically")}</button>
                        </div>
                    </div>
                )
            }
            <div className={style.searchDiv}>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className={style.serchInput}
                    placeholder={t("search") + "..."}
                />
            </div>
        </div>
    );
}

export default Header