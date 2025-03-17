import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@/components/ui/table'
import { Star } from 'lucide-react'

export const ProductDetailsTabs = () => {
  return (
    <div className="mt-16">
      <Tabs defaultValue="details">
        <TabsList className="w-full justify-start border-b">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-4">
          <p className="text-gray-700 max-w-2xl">
            Sneaker contemporanee ispirate al running firmate Y-3. La tomaia in
            pelle e neoprene è rifinita con un'intersuola in EVA per un look
            pulito e minimalista. Il design slip-on è completato da una chiusura
            con lacci.
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-700">
            <li>Chiusura con lacci</li>
            <li>Tomaia in pelle e neoprene</li>
            <li>Fodera in pelle e neoprene</li>
            <li>Intersuola in EVA</li>
            <li>Colore prodotto: Core White / Talc / Wonder White</li>
          </ul>
        </TabsContent>
        <TabsContent value="specs" className="mt-4">
          <Table className="w-2xl text-left">
            <TableBody>
              <TableRow>
                <TableHead>Suola</TableHead>
                <TableCell>Gomma</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableCell>EVA</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Color</TableHead>
                <TableCell>Core White / Talc / Wonder White</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Support System</TableHead>
                <TableCell>Torsion System</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Chiusura</TableHead>
                <TableCell>Lacci</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="reviews" className="mt-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-600">
                    JD
                  </span>
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">John Doe</h3>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mt-1">
                  Great quality and very comfortable.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-600">
                    JS
                  </span>
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">Jane Smith</h3>
                <div className="flex items-center">
                  {[1, 2, 3, 4].map(star => (
                    <Star key={star} className="w-4 h-4 text-yellow-400" />
                  ))}
                  {[5].map(star => (
                    <Star key={star} className="w-4 h-4 text-gray-300" />
                  ))}
                </div>
                <p className="text-gray-600 mt-1">
                  Stylish and comfortable. I love them!
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProductDetailsTabs
