import { useEffect, useMemo, useState } from 'react';
import { MapPin, Star, Search, SlidersHorizontal, X, ChevronDown, Heart } from 'lucide-react';
import type { Salon } from '@/data/salons';

interface Props { salons: Salon[]; title?: string; initialSearch?: string; }

export default function DiscoveryPanel({ salons, title = 'Nearby barbershops', initialSearch = '' }: Props) {
  const [query, setQuery] = useState(initialSearch);
  const [showFilter, setShowFilter] = useState(false);
  const [locationFilter, setLocationFilter] = useState('Nearby');
  const [distanceFilter, setDistanceFilter] = useState('Any distance');
  const [minimumRating, setMinimumRating] = useState('Any rating');
  const [sortBy, setSortBy] = useState('Recommended');
  const [saved, setSaved] = useState<string[]>([]);
  const results = useMemo(() => salons.filter((salon) => {
    const matchesQuery = `${salon.name} ${salon.address}`.toLowerCase().includes(query.toLowerCase());
    const matchesLocation = locationFilter === 'Nearby' || salon.address.includes(locationFilter);
    const matchesDistance = distanceFilter === 'Any distance' || Number.parseFloat(salon.distance) <= Number.parseFloat(distanceFilter);
    const matchesRating = minimumRating === 'Any rating' || Number(salon.rating) >= Number.parseFloat(minimumRating);
    return matchesQuery && matchesLocation && matchesDistance && matchesRating;
  }).sort((a, b) => sortBy === 'Nearest first' ? Number.parseFloat(a.distance) - Number.parseFloat(b.distance) : sortBy === 'Highest rated' ? Number(b.rating) - Number(a.rating) : 0), [salons, query, locationFilter, distanceFilter, minimumRating, sortBy]);
  const resetFilters = () => { setQuery(''); setLocationFilter('Nearby'); setDistanceFilter('Any distance'); setMinimumRating('Any rating'); setSortBy('Recommended'); };
  const showResults = query.trim().length > 0 || locationFilter !== 'Nearby' || distanceFilter !== 'Any distance' || minimumRating !== 'Any rating' || sortBy !== 'Recommended';
  useEffect(() => {
    if (!showFilter) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setShowFilter(false); };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [showFilter]);

  return <>
    <div className="discovery-tools">
      <label className="search-box" aria-label="Search services or barbershops"><Search size={21} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search services or barbershop" /></label>
      <button className="filter-trigger" type="button" onClick={() => setShowFilter(true)} aria-label="Open search filters"><SlidersHorizontal size={20} /><span>Filters</span></button>
    </div>
    <div className={`section-heading ${showResults ? 'show-results' : ''}`}><h2>{title}</h2><span className="muted">{results.length} places</span></div>
    <div className={`result-list ${showResults ? 'show-results' : ''}`}>
      {results.map((salon) => <article className="card salon-card" key={salon.slug}>
        <a className="salon-image-link" href={`/salon/${salon.slug}`} aria-label={`View ${salon.name}`}><img src={salon.image} alt={`Barber working at ${salon.name}`} width="88" height="88" loading="lazy" /></a>
        <div className="salon-info"><a href={`/salon/${salon.slug}`}><h3>{salon.name}</h3></a><p>{salon.address}</p><div className="meta-row"><span className="meta-item"><MapPin size={15} fill="currentColor" />{salon.distance}</span><span className="meta-item"><Star size={15} fill="currentColor" className="rating-star" />{salon.rating} ({salon.reviews} reviews)</span></div></div>
        <button className={`save-button ${saved.includes(salon.slug) ? 'saved' : ''}`} type="button" aria-label={`${saved.includes(salon.slug) ? 'Remove' : 'Save'} ${salon.name}`} onClick={() => setSaved((current) => current.includes(salon.slug) ? current.filter((id) => id !== salon.slug) : [...current, salon.slug])}><Heart size={18} fill={saved.includes(salon.slug) ? 'currentColor' : 'none'} /></button>
      </article>)}
      {results.length === 0 && <div className="empty-state card"><Search size={25} /><strong>No barbershops found</strong><span>Try a different name or clear your filters.</span><button className="text-link" onClick={resetFilters}>Clear search</button></div>}
    </div>
    {showFilter && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowFilter(false); }}><section className="filter-sheet" role="dialog" aria-modal="true" aria-labelledby="filter-heading"><button className="sheet-close" onClick={() => setShowFilter(false)} aria-label="Close filters"><X size={20} /></button><span className="sheet-grabber" /><h2 id="filter-heading">Search Filter</h2><label className="filter-label">Location<select className="form-control" value={locationFilter} onChange={(event) => setLocationFilter(event.target.value)}><option>Nearby</option><option>Downtown City</option><option>Royal Park</option></select><ChevronDown className="select-chevron" size={18} /></label><label className="filter-label">Distance<select className="form-control" value={distanceFilter} onChange={(event) => setDistanceFilter(event.target.value)}><option>Any distance</option><option value="2">Within 2 Km</option><option value="5">Within 5 Km</option></select><ChevronDown className="select-chevron" size={18} /></label><label className="filter-label">Minimum rating<select className="form-control" value={minimumRating} onChange={(event) => setMinimumRating(event.target.value)}><option>Any rating</option><option value="4.5">4.5 and above</option><option value="4.8">4.8 and above</option></select><ChevronDown className="select-chevron" size={18} /></label><label className="filter-label">Sort by<select className="form-control" value={sortBy} onChange={(event) => setSortBy(event.target.value)}><option>Recommended</option><option>Nearest first</option><option>Highest rated</option></select><ChevronDown className="select-chevron" size={18} /></label><div className="filter-actions"><button className="button button-outline" onClick={resetFilters}>Reset</button><button className="button" onClick={() => setShowFilter(false)}>Apply filters</button></div></section></div>}
    <style>{`
      .discovery-tools{display:flex;gap:12px}.discovery-tools .search-box{flex:1;border:1px solid #eef0f3}.filter-trigger{display:flex;align-items:center;gap:8px;padding:0 16px;border:0;border-radius:14px;background:#eaf2f3;color:#38767d;font-weight:650}.result-list{display:grid;gap:14px}.result-list .salon-card{position:relative;padding:14px 45px 14px 14px;min-height:110px}.salon-image-link{flex:none}.salon-image-link img{width:84px;height:84px;object-fit:cover;border-radius:13px}.save-button{position:absolute;right:13px;top:15px;border:0;background:transparent;color:#7f8a9e;padding:6px}.save-button.saved{color:#e4556c}.salon-info h3{padding-right:8px}.empty-state{display:grid;justify-items:center;gap:10px;padding:42px 20px;color:#7f8a9e;text-align:center}.empty-state strong{color:#171a20;font-size:17px}.modal-backdrop{position:fixed;z-index:50;inset:0;display:flex;align-items:flex-end;justify-content:center;background:rgba(12,18,28,.48);backdrop-filter:blur(3px)}.filter-sheet{position:relative;width:min(100%,560px);padding:18px 24px max(26px,env(safe-area-inset-bottom));border-radius:26px 26px 0 0;background:white}.sheet-grabber{display:block;width:54px;height:5px;margin:0 auto 26px;border-radius:4px;background:#e0e3e9}.sheet-close{position:absolute;right:22px;top:20px;border:0;background:none;color:#7f8a9e}.filter-sheet h2{text-align:center;font-size:20px;margin:0 0 29px}.filter-label{position:relative;display:block;margin:0 0 16px;font-size:13px}.filter-label select{display:block;margin-top:7px;appearance:none}.select-chevron{position:absolute;right:14px;bottom:15px;color:#8490a3;pointer-events:none}.filter-actions{display:flex;gap:14px;margin-top:6px}.filter-actions .button{flex:1}@media(min-width:768px){.modal-backdrop{align-items:center}.filter-sheet{border-radius:24px;padding:28px 32px}.result-list{grid-template-columns:1fr 1fr}.result-list .salon-card{min-width:0}.discovery-tools{max-width:720px}}
    `}</style>
  </>;
}
