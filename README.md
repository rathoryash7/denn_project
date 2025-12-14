# Product Detail Page - React Application

A pixel-perfect React single-page application replicating an industrial e-commerce product detail page.

## Features

- **Product Information**: Title, description, and product identification details
- **Image Gallery**: Carousel with navigation arrows and image indicators
- **Technical Data Table**: Structured table displaying product specifications
- **Accordion Sections**: Expandable sections for additional information (Price, Specification sheets, CAD files, Tender specifications, Instruction)
- **Price Calculation**: Dynamic total price calculation (unit price × quantity) displayed in Additional Information section
- **Real-time Price Updates**: Total price updates instantly when quantity changes
- **Certificates Section**: Grid display of certification logos
- **Quantity Selector**: Input field for selecting product quantity with real-time price calculation
- **Add to Notepad**: Button for adding products to notepad with navigation
- **Notepad Page**: Full notepad page with product list, price column, and management features
- **State Management**: React Context for managing notepad items, quantities, and prices
- **Routing**: React Router for navigation between Product and Notepad pages
- **Accessory Button**: Expandable accessory section button

## Tech Stack

- **React 18** - Modern React with functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Router DOM** - Client-side routing for navigation
- **React Context API** - State management for notepad and product data

## Project Structure

```
new_project/
├── src/
│   ├── components/
│   │   ├── ProductInfo.jsx          # Product title, description, and identification
│   │   ├── ImageGallery.jsx         # Image carousel with navigation
│   │   ├── TechnicalDataTable.jsx   # Technical specifications table
│   │   ├── AdditionalInformation.jsx # Accordion sections with price calculation
│   │   ├── Accordion.jsx            # Reusable accordion component
│   │   ├── CertificatesSection.jsx  # Certification logos grid
│   │   ├── QuantitySelector.jsx     # Quantity input field (controlled component)
│   │   ├── AddToNotepad.jsx         # Add to Notepad button with navigation
│   │   └── AccessoryButton.jsx      # Accessory section button
│   ├── pages/
│   │   ├── ProductDetailPage.jsx    # Main product detail page
│   │   └── NotepadPage.jsx          # Notepad page with product list and prices
│   ├── context/
│   │   └── NotepadContext.jsx       # Context for notepad state management
│   ├── App.jsx                      # Main application with routing
│   ├── main.jsx                     # Application entry point
│   └── index.css                    # Global styles and Tailwind imports
├── index.html                       # HTML template
├── package.json                     # Dependencies and scripts
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind CSS configuration
└── postcss.config.js                # PostCSS configuration
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in the terminal)

### Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Component Details

### ProductInfo
Displays the product title, description, product count, and identification details (Part No., GTIN, Customs tariff No., Gross weight, PU).

### ImageGallery
Image carousel component with:
- Previous/Next navigation arrows
- Image indicators showing current position
- Placeholder product image

### TechnicalDataTable
Table displaying technical specifications with alternating row colors for better readability.

### AdditionalInformation
Contains accordion sections for:
- **Price**: Unit price display
- **Total Price Display**: Shows calculated total price (unit price × quantity) above quantity selector
- **Quantity Selector**: Input field that updates total price in real-time
- Specification sheets
- CAD files
- Tender specifications
- Instruction

**Price Calculation Logic:**
- Total Price = Unit Price × Quantity
- Updates dynamically when quantity changes
- Displayed above the quantity input field

### Accordion
Reusable accordion component that expands/collapses to show/hide content.

### CertificatesSection
Grid layout displaying certification logos (ATEX, CCC, CE, CSA, IECEx, DEHN, UK CA, UL).

### QuantitySelector
Controlled component for selecting product quantity:
- Accepts `quantity` and `onChange` props
- Validates minimum value of 1
- Used in both Product Detail Page and Notepad Page

### AddToNotepad
Button component that:
- Adds product to notepad context with calculated price
- Navigates to Notepad page
- Passes product data, quantity, unit price, and currency

### NotepadPage
Full notepad page featuring:
- Product list with images, names, and descriptions
- **Unit Price column**: Shows individual product unit price
- **Quantity input**: Editable quantity for each product
- **Total Price column**: Calculated total (unit price × quantity) for each product
- Remove functionality for individual items
- Clear list functionality
- Add new products section
- Print and PDF export options

**Price Calculation in Notepad:**
- Each item calculates: `totalPrice = unitPrice × quantity`
- Updates in real-time when quantity changes
- Price column displays the calculated total for each product

### AccessoryButton
Button for accessing accessory products section.

## Styling

The application uses Tailwind CSS for styling, providing:
- Consistent spacing and typography
- Responsive grid layouts
- Professional industrial e-commerce appearance
- Clean borders and shadows
- Hover effects on interactive elements

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Price Calculation Features

### Product Detail Page
- **Unit Price**: Displayed in the "Price" accordion section
- **Total Price**: Calculated as `unitPrice × quantity` and displayed above quantity selector
- **Real-time Updates**: Total price updates instantly when quantity changes
- **Quantity Management**: Quantity state managed in ProductDetailPage component

### Notepad Page
- **Unit Price Column**: Shows the unit price for each product
- **Quantity Input**: Editable quantity field for each product
- **Total Price Column**: Displays calculated total (unit price × quantity) for each product
- **Dynamic Updates**: Total price recalculates when quantity is changed in the notepad

### State Management
- **NotepadContext**: Manages all notepad items, quantities, and prices
- **Price Calculation**: Performed in context when adding/updating items
- **Data Persistence**: State persists during navigation (until page refresh)

## Notes

- All buttons and interactive elements are functional (UI only, no backend integration)
- Placeholder images and icons are used where exact assets are not available
- The layout is responsive and works on desktop and smaller screens
- All components are self-contained and reusable
- Price calculations update instantly without page refresh
- Navigation between Product and Notepad pages uses React Router
- Notepad state is managed via React Context API

## License

This project is created for demonstration purposes.

