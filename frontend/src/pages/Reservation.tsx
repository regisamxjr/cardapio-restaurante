import { useState, useEffect } from 'react';
import { Footer } from '../components/Footer';
import { Modal } from '../components/Modal';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

interface Table {
  id: string;
  label: string;
  status: 'available' | 'occupied' | 'selected';
  x: number;
  y: number;
  seats: number;
  type: 'round' | 'square';
}

export function Reservation() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    guests: 2,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState<{ isOpen: boolean; title: string; message: string; type: 'success' | 'error' }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'success'
  });

  const initialLayout: Omit<Table, 'status'>[] = [
    { id: 'E1', label: 'E1', x: 10, y: 25, seats: 6, type: 'square' },
    { id: 'E2', label: 'E2', x: 10, y: 65, seats: 6, type: 'square' },
    { id: 'D1', label: 'D1', x: 90, y: 25, seats: 6, type: 'square' },
    { id: 'D2', label: 'D2', x: 90, y: 65, seats: 6, type: 'square' },
    { id: 'C1', label: 'C1', x: 35, y: 30, seats: 4, type: 'round' },
    { id: 'C2', label: 'C2', x: 65, y: 30, seats: 4, type: 'round' },
    { id: 'C3', label: 'C3', x: 35, y: 60, seats: 4, type: 'round' },
    { id: 'C4', label: 'C4', x: 65, y: 60, seats: 4, type: 'round' },
    { id: 'B1', label: 'B1', x: 20, y: 90, seats: 2, type: 'square' },
    { id: 'B2', label: 'B2', x: 35, y: 90, seats: 2, type: 'square' },
    { id: 'B3', label: 'B3', x: 65, y: 90, seats: 2, type: 'square' },
    { id: 'B4', label: 'B4', x: 80, y: 90, seats: 2, type: 'square' },
  ];

  const [tables, setTables] = useState<Table[]>(initialLayout.map(t => ({ ...t, status: 'available' })));

  useEffect(() => {
    if (selectedTable) {
      const table = tables.find(t => t.id === selectedTable);
      if (table && formData.guests > table.seats) {
        setFormData(prev => ({ ...prev, guests: table.seats }));
      }
    }
  }, [selectedTable, tables]);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const backendTables = await api.getTables();
      
      if (Array.isArray(backendTables)) {
        setTables(currentTables => currentTables.map(table => {
          const backendTable = backendTables.find((bt: any) => 
            String(bt.id) === table.id || String(bt.number) === table.label
          );
          
          if (backendTable) {
            return {
              ...table,
              status: backendTable.isAvailable ? 'available' : 'occupied'
            };
          }
          return table;
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar mesas:', error);
    }
  };

  const handleTableClick = (tableId: string, status: string) => {
    if (status === 'occupied') return;
    setSelectedTable(tableId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTable) {
      setModalState({
        isOpen: true,
        title: 'Atenção',
        message: 'Por favor, escolha uma mesa no mapa.',
        type: 'error'
      });
      return;
    }

    setIsLoading(true);
    try {
      const dateTime = new Date(`${formData.date}T${formData.time}`).toISOString();

      await api.createReservation({
        name: formData.name,
        date: dateTime,
        guests: formData.guests,
        tableId: selectedTable
      });

      setModalState({
        isOpen: true,
        title: 'Sucesso!',
        message: `Reserva confirmada para ${formData.name} na mesa ${selectedTable}!`,
        type: 'success'
      });
      
      setFormData({ name: '', date: '', time: '', guests: 2 });
      setSelectedTable(null);
      fetchTables();
      
    } catch (error) {
      console.error('Erro ao criar reserva:', error);
      setModalState({
        isOpen: true,
        title: 'Erro',
        message: 'Erro ao realizar a reserva. Verifique se o servidor está rodando.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1a39] font-['Apple_Chancery',_cursive] scroll-smooth text-[#e0d6cc]">
      <Modal 
        isOpen={modalState.isOpen}
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
      
      <main className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="inline-flex items-center justify-center bg-[#ab8442] text-white p-2 rounded-full hover:bg-[#c4a05f] transition-colors shadow-lg" title="Voltar ao Menu">
              <ChevronLeft size={24} />
            </Link>
            <h1 className="text-4xl md:text-5xl text-[#ab8442]">Faça sua Reserva</h1>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 bg-[#16213e] p-6 rounded-lg shadow-xl relative min-h-[500px] border border-[#ab8442]/30">
            <h2 className="text-2xl text-center mb-6 text-[#ab8442]">Planta do Restaurante</h2>
            
            <div className="flex justify-center gap-4 mb-6 text-sm flex-wrap">
              <div className="flex items-center"><div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>Disponível</div>
              <div className="flex items-center"><div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>Ocupada</div>
              <div className="flex items-center"><div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>Selecionada</div>
            </div>

            <div className="w-full overflow-x-auto rounded-lg border border-gray-700 bg-[#0f172a]">
              <div className="relative w-full min-w-[600px] h-[400px]">
              
              {tables.map((table) => {
                let width = '60px';
                let height = '60px';
                
                if (table.seats === 6) {
                  width = '60px';
                  height = '100px';
                } else if (table.seats === 2) {
                  width = '80px';
                  height = '40px';
                } else if (table.type === 'round') {
                  width = '70px';
                  height = '70px';
                }

                return (
                  <button
                    key={table.id}
                    onClick={() => handleTableClick(table.id, table.status)}
                    disabled={table.status === 'occupied'}
                    className={`absolute flex items-center justify-center transition-all transform hover:scale-105
                      ${table.type === 'round' ? 'rounded-full' : 'rounded-lg'}
                      ${table.status === 'occupied' ? 'bg-red-500 cursor-not-allowed opacity-50' : 
                        selectedTable === table.id ? 'bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]' : 'bg-green-500 hover:bg-green-400'}
                    `}
                    style={{
                      left: `${table.x}%`,
                      top: `${table.y}%`,
                      width,
                      height,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-black">{table.label}</span>
                      <span className="text-[10px] text-black font-sans">{table.seats} lug.</span>
                    </div>
                  </button>
                );
              })}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3 bg-[#16213e] p-6 rounded-lg shadow-xl border border-[#ab8442]/30 h-fit">
            <h2 className="text-2xl mb-6 text-[#ab8442]">Detalhes da Reserva</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              <div>
                <label className="block text-sm mb-1 text-gray-300">Mesa Selecionada</label>
                <div className="w-full p-3 bg-[#0b1a39] border border-gray-600 rounded text-[#ab8442] font-bold">
                  {selectedTable ? `Mesa ${selectedTable}` : 'Selecione a sua mesa'}
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-300">Seu Nome</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 bg-[#0b1a39] border border-gray-600 rounded text-white focus:border-[#ab8442] focus:outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-300">Data</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 bg-[#0b1a39] border border-gray-600 rounded text-white focus:border-[#ab8442] focus:outline-none mb-4"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
                
                <label className="block text-sm mb-1 text-gray-300">Horário (17:00 - 00:00)</label>
                <select
                  required
                  className="w-full p-3 bg-[#0b1a39] border border-gray-600 rounded text-white focus:border-[#ab8442] focus:outline-none"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                >
                  <option value="">Selecione um horário</option>
                  {['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '00:00'].map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-300">Número de Pessoas</label>
                <select 
                  className="w-full p-3 bg-[#0b1a39] border border-gray-600 rounded text-white focus:border-[#ab8442] focus:outline-none"
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: Number(e.target.value)})}
                  disabled={!selectedTable}
                >
                  {!selectedTable ? (
                    <option value={2}>Selecione uma mesa primeiro</option>
                  ) : (
                    Array.from({ length: tables.find(t => t.id === selectedTable)?.seats || 2 }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'pessoa' : 'pessoas'}</option>
                    ))
                  )}
                </select>
                {selectedTable && (
                  <p className="text-xs text-gray-500 mt-1">
                    Capacidade máxima da mesa {selectedTable}: {tables.find(t => t.id === selectedTable)?.seats} pessoas
                  </p>
                )}
              </div>

              <button 
                type="submit"
                disabled={!selectedTable || isLoading}
                className={`w-full py-3 rounded font-bold transition-all mt-4
                  ${selectedTable && !isLoading
                    ? 'bg-[#ab8442] text-white hover:bg-[#c4a05f]' 
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'}
                `}
              >
                {isLoading ? 'Enviando...' : 'Confirmar Reserva'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer showReviewForm={false} />
    </div>
  );
}
