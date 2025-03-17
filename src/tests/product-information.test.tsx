import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import ProductInformation from '@/components/products/product-information'

describe('ProductInformation', () => {
  it('deve renderizzare correttamente il nome, il prezzo e la descrizione', () => {
    render(
      <ProductInformation
        productName="Product Test"
        productPrice={99.99}
        productDescription="Product Description"
        colors={[]}
        isFavorite={false}
        quantity={1}
        onToggleFavorite={() => {}}
        onDecrement={() => {}}
        onIncrement={() => {}}
      />
    )

    // Verificare se il nome è stato inviato
    expect(screen.getByText('Product Test')).toBeInTheDocument()

    // Controlla se il prezzo viene renderizzato
    expect(screen.getByText('$ 99.99')).toBeInTheDocument()

    // Controlla se la descrizione viene renderizzata
    expect(screen.getByText('Product Description')).toBeInTheDocument()
  })

  it('dovrebbe chiamare la funzione preferita quando si fa clic sul pulsante preferito', async () => {
    const onToggleFavoriteMock = jest.fn()
    render(
      <ProductInformation
        productName="Product Test"
        productPrice={10}
        productDescription=""
        colors={[]}
        isFavorite={false}
        quantity={1}
        onToggleFavorite={onToggleFavoriteMock}
        onDecrement={() => {}}
        onIncrement={() => {}}
      />
    )


    const favoriteButton = screen.getByRole('button', {
      name: /Add to Favorites/i
    })

    // Attiva il clic con userEvent
    await userEvent.click(favoriteButton)

    // onToggleFavoriteMock deve essere stato chiamato 1 volta
    expect(onToggleFavoriteMock).toHaveBeenCalledTimes(1)
  })

  it('deve aumentare e diminuire la quantità', async () => {
    const onIncrementMock = jest.fn()
    const onDecrementMock = jest.fn()
    render(
      <ProductInformation
        productName="Quantità di prodotto"
        productPrice={10}
        productDescription=""
        colors={[]}
        isFavorite={false}
        quantity={2}
        onToggleFavorite={() => {}}
        onDecrement={onDecrementMock}
        onIncrement={onIncrementMock}
      />
    )

    const decrementButton = screen.getByLabelText(/remove/i)
    const incrementButton = screen.getByLabelText(/add/i)



    await userEvent.click(decrementButton)
    expect(onDecrementMock).toHaveBeenCalledTimes(1)

    await userEvent.click(incrementButton)
    expect(onIncrementMock).toHaveBeenCalledTimes(1)
  })
})
