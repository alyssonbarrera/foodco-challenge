import { useEffect, useState } from 'react'
import { ArrowDownIcon, Button } from '../components/Button'
import { ArrowUpIcon } from '../components/Button'
import { Card } from '../components/Card'
import { InputSearch } from '../components/InputSearch'

import styles from '../styles/Home.module.css'

export default function Home({data}) {

  const [inputValue, setInputValue] = useState('')
  const [amoutOfData, setAmoutOfData] = useState(10)
  const [filterByMoreDiscount, setFilterByMoreDiscount] = useState(false)
  const [filterByLessDiscount, setFilterByLessDiscount] = useState(false)
  const [scrollPositionIsExpected, setScrollPositionIsExpected] = useState(false)

  const filterDataAlphabetically = data.filter(item => 
    item.fantasyName.toLowerCase().includes(inputValue.toLowerCase())
    ).sort((a, b) => a.fantasyName.localeCompare(b.fantasyName))

  const filteredData = filterByMoreDiscount
  ? filterDataAlphabetically.sort((a, b) => b.discountAmount - a.discountAmount)
  : filterByLessDiscount ? filterDataAlphabetically.sort((a, b) => a.discountAmount - b.discountAmount)
  : filterDataAlphabetically

  function handleScroll() {
    if(window.scrollY > 650) {
      setScrollPositionIsExpected(true)
    } else {
      setScrollPositionIsExpected(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])

  function handleDiscountFilter(discount) {
    if(discount == 'more') {
      if(filterByMoreDiscount) {
        setFilterByMoreDiscount(false)
      } else {
        setFilterByLessDiscount(false)
        setFilterByMoreDiscount(true)
      }
    } else if(discount == 'less') {
      if(filterByLessDiscount) {
        setFilterByLessDiscount(false)
      } else {
        setFilterByMoreDiscount(false)
        setFilterByLessDiscount(true)
      }
    }
  }

  return (
    <>
      <header className={styles.home__header}>
        <InputSearch onSearch={setInputValue} />
      </header>

      <main className={styles.home__main}>
        <h1>Estabelecimentos</h1>
        <div className={styles.home__main_filter}>
          <p>filtrar por desconto</p>

          <div>
            <Button
              onClick={() => handleDiscountFilter('more')}
              isActive={filterByMoreDiscount}
            >
              <ArrowUpIcon />
            </Button>
            <Button
              onClick={() => handleDiscountFilter('less')}
              isActive={filterByLessDiscount}
            >
              <ArrowDownIcon />
            </Button>
          </div>
        </div>

        <section className={styles.home__section}>
          {
            filteredData.map(item => (
              <Card
                key={item.id}
                name={item.fantasyName}
                image={item.cover}
                discount={item.discountAmount}
              />
            )).slice(0, amoutOfData)
          }
        </section>

        {
          filteredData.length <= amoutOfData ? null : (
            <Button
              onClick={() => setAmoutOfData(amoutOfData + 10)}
              variant="long"
            >
              carregar mais
            </Button>
          )
        }

      </main>
      
      <footer className={styles.home__footer}>
        {
          scrollPositionIsExpected &&
            <Button
            onClick={() => {
              window.scrollTo({
                  top: 0,
                  behavior: "smooth",
              });
            }}
            >
              <ArrowUpIcon />
            </Button>
        }
      </footer>
    </>
  )
}

export const getStaticProps = async () => {
  const api_url = "https://gdp-prd-clube.s3.amazonaws.com/api/repository/partners/all.json"
  const api_response = await fetch(api_url).then(response => response.json())

  const data = api_response.map(item => ({
    ...item,
    fantasyName: item.fantasyName.trim()
  }))

  return {
    props: {
      data
    },
    revalidate: 60 * 60 * 48 // 48 hours
  }
}