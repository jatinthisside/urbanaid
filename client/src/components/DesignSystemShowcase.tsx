export function DesignSystemShowcase() {
  return (
    <div className="container-custom section-padding">
      {/* container-custom: Responsive container with auto margins */}
      {/* section-padding: Standard vertical padding for sections */}
      
      <div className="animate-fade-in">
        {/* animate-fade-in: Animation that fades in element from bottom */}
        <h1 className="text-title mb-6">Design System Showcase</h1>
        {/* text-title: Large page heading with responsive sizing */}
        <p className="text-body mb-8">A comprehensive demonstration of our design system elements using custom utility classes.</p>
        {/* text-body: Standard body text style */}
      </div>
      
      {/* Color Palette */}
      <section className="mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-subtitle mb-6">Color Palette</h2>
        {/* text-subtitle: Section heading style */}
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Primary Colors</h3>
          <div className="flex flex-wrap gap-3">
            {/* flex flex-wrap gap-3: Flexible layout with wrapping and gap */}
            <div className="rounded shadow-sm overflow-hidden w-24">
              {/* shadow-sm: Small shadow effect */}
              <div className="bg-primary-50 h-16"></div>
              {/* bg-primary-50: Primary color with 50 shade */}
              <div className="p-sm text-center text-sm">50</div>
              <div className="text-xs p-xs text-center text-muted-foreground">bg-primary-50</div>
            </div>
            <div className="rounded shadow-sm overflow-hidden w-24">
              <div className="bg-primary-100 h-16"></div>
              {/* bg-primary-100: Primary color with 100 shade */}
              <div className="p-sm text-center text-sm">100</div>
              <div className="text-xs p-xs text-center text-muted-foreground">bg-primary-100</div>
            </div>
            <div className="rounded shadow-sm overflow-hidden w-24">
              <div className="bg-primary-200 h-16"></div>
              {/* bg-primary-200: Primary color with 200 shade */}
              <div className="p-sm text-center text-sm">200</div>
              <div className="text-xs p-xs text-center text-muted-foreground">bg-primary-200</div>
            </div>
            <div className="rounded shadow-sm overflow-hidden w-24">
              <div className="bg-primary-300 h-16"></div>
              {/* bg-primary-300: Primary color with 300 shade */}
              <div className="p-sm text-center text-sm">300</div>
              <div className="text-xs p-xs text-center text-muted-foreground">bg-primary-300</div>
            </div>
            <div className="rounded shadow-sm overflow-hidden w-24">
              <div className="bg-primary-400 h-16"></div>
              {/* bg-primary-400: Primary color with 400 shade */}
              <div className="p-sm text-center text-sm">400</div>
              <div className="text-xs p-xs text-center text-muted-foreground">bg-primary-400</div>
            </div>
            <div className="rounded shadow-sm overflow-hidden w-24">
              <div className="bg-primary-500 h-16"></div>
              {/* bg-primary-500: Primary color with 500 shade */}
              <div className="p-sm text-center text-sm">500</div>
              <div className="text-xs p-xs text-center text-muted-foreground">bg-primary-500</div>
            </div>
            <div className="rounded shadow-sm overflow-hidden w-24">
              <div className="bg-primary h-16"></div>
              {/* bg-primary: Main primary color (600 shade) */}
              <div className="p-sm text-center text-sm">600</div>
              <div className="text-xs p-xs text-center text-muted-foreground">bg-primary</div>
            </div>
            <div className="rounded shadow-sm overflow-hidden w-24">
              <div className="bg-primary-700 h-16"></div>
              {/* bg-primary-700: Primary color with 700 shade */}
              <div className="p-sm text-center text-sm">700</div>
              <div className="text-xs p-xs text-center text-muted-foreground">bg-primary-700</div>
            </div>
            <div className="rounded shadow-sm overflow-hidden w-24">
              <div className="bg-primary-800 h-16"></div>
              {/* bg-primary-800: Primary color with 800 shade */}
              <div className="p-sm text-center text-sm">800</div>
              <div className="text-xs p-xs text-center text-muted-foreground">bg-primary-800</div>
            </div>
            <div className="rounded shadow-sm overflow-hidden w-24">
              <div className="bg-primary-900 h-16"></div>
              {/* bg-primary-900: Primary color with 900 shade */}
              <div className="p-sm text-center text-sm">900</div>
              <div className="text-xs p-xs text-center text-muted-foreground">bg-primary-900</div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Secondary Colors</h3>
          <div className="flex flex-wrap gap-3">
            <div className="rounded shadow-sm overflow-hidden w-24">
              <div className="bg-secondary-50 h-16"></div>
              {/* bg-secondary-50: Secondary color with 50 shade */}
              <div className="p-sm text-center text-sm">50</div>
              <div className="text-xs p-xs text-center text-muted-foreground">bg-secondary-50</div>
            </div>
            <div className="rounded shadow-sm overflow-hidden w-24">
              <div className="bg-secondary-100 h-16"></div>
              {/* bg-secondary-100: Secondary color with 100 shade */}
              <div className="p-sm text-center text-sm">100</div>
              <div className="text-xs p-xs text-center text-muted-foreground">bg-secondary-100</div>
            </div>
            <div className="rounded shadow-sm overflow-hidden w-24">
              <div className="bg-secondary-200 h-16"></div>
              {/* bg-secondary-200: Secondary color with 200 shade */}
              <div className="p-sm text-center text-sm">200</div>
              <div className="text-xs p-xs text-center text-muted-foreground">bg-secondary-200</div>
            </div>
            <div className="rounded shadow-sm overflow-hidden w-24">
              <div className="bg-secondary-300 h-16"></div>
              {/* bg-secondary-300: Secondary color with 300 shade */}
              <div className="p-sm text-center text-sm">300</div>
              <div className="text-xs p-xs text-center text-muted-foreground">bg-secondary-300</div>
            </div>
            <div className="rounded shadow-sm overflow-hidden w-24">
              <div className="bg-secondary h-16"></div>
              {/* bg-secondary: Main secondary color (400 shade) */}
              <div className="p-sm text-center text-sm">400</div>
              <div className="text-xs p-xs text-center text-muted-foreground">bg-secondary</div>
            </div>
            <div className="rounded shadow-sm overflow-hidden w-24">
              <div className="bg-secondary-500 h-16"></div>
              {/* bg-secondary-500: Secondary color with 500 shade */}
              <div className="p-sm text-center text-sm">500</div>
              <div className="text-xs p-xs text-center text-muted-foreground">bg-secondary-500</div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Accent Colors</h3>
          <div className="flex flex-wrap gap-3">
            <div className="rounded shadow-sm overflow-hidden w-24">
              <div className="bg-accent-100 h-16"></div>
              {/* bg-accent-100: Accent color with 100 shade */}
              <div className="p-sm text-center text-sm">100</div>
              <div className="text-xs p-xs text-center text-muted-foreground">bg-accent-100</div>
            </div>
            <div className="rounded shadow-sm overflow-hidden w-24">
              <div className="bg-accent-300 h-16"></div>
              {/* bg-accent-300: Accent color with 300 shade */}
              <div className="p-sm text-center text-sm">300</div>
              <div className="text-xs p-xs text-center text-muted-foreground">bg-accent-300</div>
            </div>
            <div className="rounded shadow-sm overflow-hidden w-24">
              <div className="bg-accent h-16"></div>
              {/* bg-accent: Main accent color (500 shade) */}
              <div className="p-sm text-center text-sm">500</div>
              <div className="text-xs p-xs text-center text-muted-foreground">bg-accent</div>
            </div>
            <div className="rounded shadow-sm overflow-hidden w-24">
              <div className="bg-accent-700 h-16"></div>
              {/* bg-accent-700: Accent color with 700 shade */}
              <div className="p-sm text-center text-sm">700</div>
              <div className="text-xs p-xs text-center text-muted-foreground">bg-accent-700</div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">Semantic Colors</h3>
          <div className="flex flex-wrap gap-3">
            <div className="rounded shadow-sm overflow-hidden w-24">
              <div className="bg-destructive h-16"></div>
              {/* bg-destructive: Destructive/error color */}
              <div className="p-sm text-center text-sm">Destructive</div>
              <div className="text-xs p-xs text-center text-muted-foreground">bg-destructive</div>
            </div>
            <div className="rounded shadow-sm overflow-hidden w-24">
              <div className="bg-muted h-16"></div>
              {/* bg-muted: Muted/subtle background color */}
              <div className="p-sm text-center text-sm">Muted</div>
              <div className="text-xs p-xs text-center text-muted-foreground">bg-muted</div>
            </div>
            <div className="rounded shadow-sm overflow-hidden w-24 border">
              {/* border: Default 1px border */}
              <div className="bg-background h-16"></div>
              {/* bg-background: Page background color */}
              <div className="p-sm text-center text-sm">Background</div>
              <div className="text-xs p-xs text-center text-muted-foreground">bg-background</div>
            </div>
            <div className="rounded shadow-sm overflow-hidden w-24">
              <div className="bg-card h-16 border"></div>
              {/* bg-card: Card background color */}
              <div className="p-sm text-center text-sm">Card</div>
              <div className="text-xs p-xs text-center text-muted-foreground">bg-card</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Typography */}
      <section className="mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-subtitle mb-6">Typography</h2>
        
        <div className="space-y-6">
          {/* space-y-6: Vertical spacing between children */}
          <div>
            <h1 className="text-title">Heading 1</h1>
            {/* text-title: Main heading style with responsive sizing */}
            <p className="text-muted mb-1">The main heading style for pages</p>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">text-title</div>
          </div>
          
          <div>
            <h2 className="text-subtitle">Heading 2</h2>
            {/* text-subtitle: Section heading style */}
            <p className="text-muted mb-1">Used for section headings</p>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">text-subtitle</div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold">Heading 3</h3>
            {/* font-semibold: Semi-bold font weight */}
            <p className="text-muted mb-1">Smaller section or card headings</p>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">text-xl font-semibold</div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold">Heading 4</h4>
            <p className="text-muted mb-1">Subsection headings</p>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">text-lg font-semibold</div>
          </div>
          
          <div>
            <p className="text-body">This is body text - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. 
              Integer at lorem nec orci feugiat dignissim vitae vel neque.</p>
            {/* text-body: Default body text style */}
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground mt-2">text-body</div>
          </div>
          
          <div>
            <p className="text-muted">This is muted text - Used for secondary information, captions, and helper text.</p>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground mt-2">text-muted</div>
          </div>
        </div>
      </section>
      
      {/* Buttons */}
      <section className="mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-subtitle mb-6">Buttons</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="flex flex-col items-center">
            <button className="btn-primary w-full">Primary Button</button>
            {/* btn-primary: Primary action button with brand color */}
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground mt-2">btn-primary</div>
          </div>
          
          <div className="flex flex-col items-center">
            <button className="btn-secondary w-full">Secondary Button</button>
            {/* btn-secondary: Secondary action button with muted style */}
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground mt-2">btn-secondary</div>
          </div>
          
          <div className="flex flex-col items-center">
            <button className="btn-outline w-full">Outline Button</button>
            {/* btn-outline: Button with transparent background and border */}
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground mt-2">btn-outline</div>
          </div>
          
          <div className="flex flex-col items-center">
            <button className="btn-ghost w-full">Ghost Button</button>
            {/* btn-ghost: Button with no background or border */}
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground mt-2">btn-ghost</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col items-center">
            <button className="btn-primary w-full" disabled>Primary (Disabled)</button>
            {/* disabled attribute applies opacity and disables pointer events */}
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground mt-2">btn-primary disabled</div>
          </div>
          
          <div className="flex flex-col items-center">
            <button className="btn-secondary w-full" disabled>Secondary (Disabled)</button>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground mt-2">btn-secondary disabled</div>
          </div>
          
          <div className="flex flex-col items-center">
            <button className="btn-outline w-full" disabled>Outline (Disabled)</button>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground mt-2">btn-outline disabled</div>
          </div>
          
          <div className="flex flex-col items-center">
            <button className="btn-ghost w-full" disabled>Ghost (Disabled)</button>
            {/* disabled attribute applies opacity and disables pointer events */}
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground mt-2">btn-ghost disabled</div>
          </div>
        </div>
      </section>
      
      {/* Cards */}
      <section className="mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-subtitle mb-6">Cards</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* grid: CSS Grid layout with responsive columns */}
          <div>
            <div className="card-standard mb-2">
              {/* card-standard: Basic card component with shadow */}
              <h3 className="text-lg font-semibold mb-2">Standard Card</h3>
              <p className="text-body">A standard card with basic styling. Useful for most content containers.</p>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">card-standard</div>
          </div>
          
          <div>
            <div className="card-glass mb-2">
              {/* card-glass: Card with glass effect using backdrop blur */}
              <h3 className="text-lg font-semibold mb-2">Glass Card</h3>
              <p className="text-body">A card with a glass effect, using backdrop blur and transparency.</p>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">card-glass</div>
          </div>
          
          <div>
            <div className="card-service mb-2">
              {/* card-service: Card for services with hover transform */}
              <h3 className="text-lg font-semibold mb-2">Service Card</h3>
              <p className="text-body">A card designed for services with hover effects. Hover to see the animation.</p>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">card-service</div>
          </div>
          
          <div>
            <div className="card-provider mb-2">
              {/* card-provider: Card for service providers with subtle hover */}
              <h3 className="text-lg font-semibold mb-2">Provider Card</h3>
              <p className="text-body">A card designed for service providers. Hover to see the shadow effect.</p>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">card-provider</div>
          </div>
          
          <div>
            <div className="card-feature mb-2">
              {/* card-feature: Card for highlighting features with colored accent */}
              <h3 className="text-lg font-semibold mb-2">Feature Card</h3>
              <p className="text-body">A card designed to highlight features. Hover to see the shadow effect.</p>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">card-feature</div>
          </div>
          
          <div>
            <div className="card-testimonial mb-2">
              {/* card-testimonial: Simpler card for testimonials with border */}
              <h3 className="text-lg font-semibold mb-2">Testimonial Card</h3>
              <p className="text-body">A simpler card with a border, designed for testimonials and quotes.</p>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">card-testimonial</div>
          </div>
        </div>
      </section>
      
      {/* Gradients */}
      <section className="mb-12 animate-fade-in" style={{ animationDelay: '0.45s' }}>
        <h2 className="text-subtitle mb-6">Gradients</h2>
        
        {/* Background Gradients */}
        <h3 className="text-lg font-semibold mb-4">Background Gradients</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="flex flex-col">
            <div className="bg-hero-gradient h-40 radius-lg mb-2 p-md flex items-center justify-center">
              <p className="text-foreground font-medium">Hero Gradient</p>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">bg-hero-gradient</div>
          </div>
          
          <div className="flex flex-col">
            <div className="bg-card-gradient h-40 radius-lg mb-2 p-md flex items-center justify-center">
              <p className="text-foreground font-medium">Card Gradient</p>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">bg-card-gradient</div>
          </div>
          
          <div className="flex flex-col">
            <div className="bg-primary-gradient h-40 radius-lg mb-2 p-md flex items-center justify-center">
              <p className="text-primary-foreground font-medium">Primary Gradient</p>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">bg-primary-gradient</div>
          </div>
          
          <div className="flex flex-col">
            <div className="bg-accent-gradient h-40 radius-lg mb-2 p-md flex items-center justify-center">
              <p className="text-accent-foreground font-medium">Accent Gradient</p>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">bg-accent-gradient</div>
          </div>
        </div>
        
        {/* Hover & Interactive Gradients */}
        <h3 className="text-lg font-semibold mb-4">Hover & Interactive Gradients</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col">
            <div className="bg-primary-gradient hover:bg-primary-gradient-hover h-32 radius-lg mb-2 p-md flex items-center justify-center transition-all duration-300 cursor-pointer">
              <p className="text-primary-foreground font-medium">Primary Hover (Hover Me)</p>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">bg-primary-gradient-hover</div>
          </div>
          
          <div className="flex flex-col">
            <div className="bg-accent-gradient hover:bg-accent-gradient-hover h-32 radius-lg mb-2 p-md flex items-center justify-center transition-all duration-300 cursor-pointer">
              <p className="text-accent-foreground font-medium">Accent Hover (Hover Me)</p>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">bg-accent-gradient-hover</div>
          </div>
        </div>
        
        {/* Text Gradients */}
        <h3 className="text-lg font-semibold mb-4">Text Gradients</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col">
            <div className="card-standard mb-2 p-md flex flex-col items-center justify-center">
              <h3 className="text-gradient-primary text-xl font-bold mb-2">Primary to Accent Gradient</h3>
              <p className="text-body">Gradient text for impactful titles</p>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">text-gradient-primary</div>
          </div>
          
          <div className="flex flex-col">
            <div className="card-standard mb-2 p-md flex flex-col items-center justify-center">
              <h3 className="text-gradient-accent text-xl font-bold mb-2">Accent to Primary Gradient</h3>
              <p className="text-body">Alternative gradient text</p>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">text-gradient-accent</div>
          </div>
        </div>
        
        {/* Gradient Animations */}
        <h3 className="text-lg font-semibold mb-4">Gradient Animations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <div className="bg-animated-hero-gradient h-40 radius-lg mb-2 p-md flex items-center justify-center">
              <p className="text-foreground font-medium">Animated Hero Gradient</p>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">bg-animated-hero-gradient</div>
          </div>
          
          <div className="flex flex-col">
            <div className="bg-hero-gradient animate-hero-gradient h-40 radius-lg mb-2 p-md flex items-center justify-center">
              <p className="text-foreground font-medium">Combined Classes Method</p>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">bg-hero-gradient + animate-hero-gradient</div>
          </div>
          
          <div className="flex flex-col">
            <div className="bg-animated-rainbow-gradient h-40 radius-lg mb-2 p-md flex items-center justify-center">
              <p className="text-foreground font-medium">Rainbow Gradient</p>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">bg-animated-rainbow-gradient</div>
          </div>
        </div>
        
        {/* Gradient Cards */}
        <h3 className="text-lg font-semibold mb-4 mt-8">Gradient Card Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <div className="h-auto radius-lg mb-2 p-md overflow-hidden">
              <div className="bg-primary-gradient h-full radius-lg p-lg">
                <h3 className="text-lg font-semibold mb-2 text-primary-foreground">Primary Gradient Card</h3>
                <p className="text-primary-foreground opacity-90">A card with primary gradient background, perfect for important content or CTAs.</p>
              </div>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">bg-primary-gradient</div>
          </div>
          
          <div className="flex flex-col">
            <div className="h-auto radius-lg mb-2 p-md overflow-hidden">
              <div className="bg-animated-hero-gradient h-full radius-lg p-lg">
                <h3 className="text-lg font-semibold mb-2">Animated Hero Card</h3>
                <p className="text-body">A card with an animated gradient background, great for attracting attention.</p>
              </div>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">bg-animated-hero-gradient</div>
          </div>
        </div>
      </section>
      
      {/* Spacing */}
      <section className="mb-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <h2 className="text-subtitle mb-6">Spacing</h2>
        
        <h3 className="text-lg font-semibold mb-3">Padding Examples</h3>
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex flex-col items-center">
            <div className="bg-primary-100 text-primary p-xs radius-sm">p-xs (0.25rem)</div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground mt-2">p-xs</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-primary-100 text-primary p-sm radius-sm">p-sm (0.5rem)</div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground mt-2">p-sm</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-primary-100 text-primary p-md radius-sm">p-md (1rem)</div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground mt-2">p-md</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-primary-100 text-primary p-lg radius-sm">p-lg (1.5rem)</div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground mt-2">p-lg</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-primary-100 text-primary p-xl radius-sm">p-xl (2rem)</div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground mt-2">p-xl</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-primary-100 text-primary p-2xl radius-sm">p-2xl (3rem)</div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground mt-2">p-2xl</div>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-3">Margin Examples with Space Classes</h3>
        <div className="flex flex-col items-start">
          {/* flex-col items-start: Vertical flex layout aligned to start */}
          <div className="flex items-center gap-4 mb-1">
            <div className="bg-primary-200 text-primary p-md radius-sm">Base Element</div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">Base element</div>
          </div>
          
          <div className="space-xs"></div>
          {/* space-xs: Extra small margin spacer (0.25rem) */}
          <div className="flex items-center gap-4 mb-1">
            <div className="bg-primary-300 text-primary p-md radius-sm">After space-xs</div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">space-xs</div>
          </div>
          
          <div className="space-sm"></div>
          {/* space-sm: Small margin spacer (0.5rem) */}
          <div className="flex items-center gap-4 mb-1">
            <div className="bg-primary-400 text-primary-foreground p-md radius-sm">After space-sm</div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">space-sm</div>
          </div>
          
          <div className="space-md"></div>
          {/* space-md: Medium margin spacer (1rem) */}
          <div className="flex items-center gap-4 mb-1">
            <div className="bg-primary-500 text-primary-foreground p-md radius-sm">After space-md</div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">space-md</div>
          </div>
          
          <div className="space-lg"></div>
          {/* space-lg: Large margin spacer (1.5rem) */}
          <div className="flex items-center gap-4 mb-1">
            <div className="bg-primary-600 text-primary-foreground p-md radius-sm">After space-lg</div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">space-lg</div>
          </div>
        </div>
      </section>
      
      {/* Border Radius */}
      <section className="mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <h2 className="text-subtitle mb-6">Border Radius</h2>
        
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col items-center">
            <div className="p-lg bg-primary-100 text-primary radius-sm w-20 h-20 flex items-center justify-center mb-2">radius-sm</div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">radius-sm</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="p-lg bg-primary-200 text-primary radius-md w-20 h-20 flex items-center justify-center mb-2">radius-md</div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">radius-md</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="p-lg bg-primary-300 text-primary radius-lg w-20 h-20 flex items-center justify-center mb-2">radius-lg</div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">radius-lg</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="p-lg bg-primary-400 text-primary-foreground radius-xl w-20 h-20 flex items-center justify-center mb-2">radius-xl</div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">radius-xl</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="p-lg bg-primary-500 text-primary-foreground radius-2xl w-20 h-20 flex items-center justify-center mb-2">radius-2xl</div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">radius-2xl</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="p-lg bg-primary-600 text-primary-foreground radius-pill w-20 h-20 flex items-center justify-center mb-2">radius-pill</div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">radius-pill</div>
          </div>
        </div>
      </section>
      
      {/* Shadows */}
      <section className="mb-12 animate-fade-in" style={{ animationDelay: '0.7s' }}>
        <h2 className="text-subtitle mb-6">Shadows</h2>
        
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col items-center">
            <div className="bg-card p-lg radius-lg shadow-sm w-32 h-32 flex items-center justify-center mb-2">shadow-sm</div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">shadow-sm</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-card p-lg radius-lg shadow-md w-32 h-32 flex items-center justify-center mb-2">shadow-md</div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">shadow-md</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-card p-lg radius-lg shadow-lg w-32 h-32 flex items-center justify-center mb-2">shadow-lg</div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">shadow-lg</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-card p-lg radius-lg shadow-xl w-32 h-32 flex items-center justify-center mb-2">shadow-xl</div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">shadow-xl</div>
          </div>
        </div>
      </section>
      
      {/* Animations */}
      <section className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <h2 className="text-subtitle mb-6">Animations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <div className="card-standard animate-fade-in w-full mb-2">
              {/* animate-fade-in: Fade in animation from bottom */}
              <h3 className="text-lg font-semibold mb-2">Fade In</h3>
              <p className="text-body">Fades in from slightly below</p>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">animate-fade-in</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="card-standard animate-scale-in w-full mb-2">
              {/* animate-scale-in: Scale in animation from slightly smaller */}
              <h3 className="text-lg font-semibold mb-2">Scale In</h3>
              <p className="text-body">Scales in from slightly smaller</p>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">animate-scale-in</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="card-standard animate-slide-in w-full mb-2">
              {/* animate-slide-in: Slide in animation from left */}
              <h3 className="text-lg font-semibold mb-2">Slide In</h3>
              <p className="text-body">Slides in from the left</p>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">animate-slide-in</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="card-standard animate-slide-up w-full mb-2">
              <h3 className="text-lg font-semibold mb-2">Slide Up</h3>
              <p className="text-body">Slides up from below</p>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">animate-slide-up</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="card-standard animate-pulse w-full mb-2">
              <h3 className="text-lg font-semibold mb-2">Pulse</h3>
              <p className="text-body">Pulses opacity continuously</p>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">animate-pulse</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="card-standard w-full mb-2">
              <h3 className="text-lg font-semibold mb-2">Bounce</h3>
              <p className="text-body flex items-center">
                <span className="inline-block animate-bounce bg-primary radius-pill w-4 h-4 mr-2"></span>
                Bounces up and down
              </p>
            </div>
            <div className="inline-block bg-secondary-100 text-xs px-2 py-1 radius-sm text-muted-foreground">animate-bounce</div>
          </div>
        </div>
      </section>
    </div>
  );
} 