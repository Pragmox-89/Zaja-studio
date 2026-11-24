import React, { useState } from 'react';
import {
  Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity,
  View,
} from 'react-native';

const C = {
  bone: '#F5F1E9', paper: '#FFFCF7', ink: '#393B35', muted: '#85867D',
  olive: '#A7AE91', oliveDark: '#727B5D', gold: '#B89550', line: '#E7DFD1',
  rose: '#B9786C', white: '#FFFFFF',
};

const initialBookings = [
  { id: 1, name: 'Valeria Ríos', service: 'Manicure rusa + nivelación', date: 'Hoy · 10:30 a. m.', duration: '1 h 30 min', status: 'pending', initials: 'VR', color: '#E7D7C8' },
  { id: 2, name: 'Camila Torres', service: 'Soft gel · diseño francés', date: 'Hoy · 1:00 p. m.', duration: '2 h', status: 'pending', initials: 'CT', color: '#D8DDCE' },
  { id: 3, name: 'Lucía Mendoza', service: 'Retiro + manicure clásica', date: 'Mañana · 11:00 a. m.', duration: '1 h', status: 'confirmed', initials: 'LM', color: '#E8DCC8' },
];
const services = [
  { name: 'Manicure rusa + nivelación', detail: '1 h 30 min', price: 'S/ 95', amount: 95 },
  { name: 'Soft gel', detail: '2 h', price: 'S/ 130', amount: 130 },
  { name: 'Manicure clásica', detail: '1 h', price: 'S/ 55', amount: 55 },
];
const BASIC_REWARD_VALUE = 55;
const initialLoyaltyClients = [
  { id: 1, name: 'Valeria Ríos', initials: 'VR', color: '#E7D7C8', stamps: 4, lastVisit: 'Visita reciente' },
  { id: 2, name: 'Camila Torres', initials: 'CT', color: '#D8DDCE', stamps: 6, lastVisit: 'Visita reciente' },
  { id: 3, name: 'Lucía Mendoza', initials: 'LM', color: '#E8DCC8', stamps: 2, lastVisit: 'Visita reciente' },
];

function GoldButton({ label, onPress, secondary = false, compact = false }) {
  return <TouchableOpacity onPress={onPress} style={[styles.goldButton, secondary && styles.secondaryButton, compact && styles.compactButton]} activeOpacity={0.8}>
    <View style={[styles.goldInner, secondary && styles.secondaryInner]}><Text style={[styles.goldText, secondary && styles.secondaryText]}>{label}</Text></View>
  </TouchableOpacity>;
}

function Brand() {
  return <View style={styles.brand}><Text style={styles.brandName}>ZAJA</Text><Text style={styles.brandSub}>S T U D I O</Text></View>;
}

export default function App() {
  const [entered, setEntered] = useState(false);
  const [tab, setTab] = useState('Inicio');
  const [bookings, setBookings] = useState(initialBookings);
  const [loyaltyClients, setLoyaltyClients] = useState(initialLoyaltyClients);
  const [selectedLoyaltyId, setSelectedLoyaltyId] = useState(null);
  const [rewardService, setRewardService] = useState('Manicure clásica');
  const [openDays, setOpenDays] = useState({ L: true, M: true, X: true, J: false, V: true, S: true, D: false });
  const [selectedDay, setSelectedDay] = useState(22);

  const updateBooking = (id, status) => setBookings(current => current.map(b => b.id === id ? { ...b, status } : b));
  const pending = bookings.filter(b => b.status === 'pending').length;

  if (!entered) return <SafeAreaView style={styles.safe}><StatusBar barStyle="dark-content" backgroundColor={C.bone} />
    <View style={styles.login}><View style={styles.loginOrnament}><View style={styles.ornamentLine} /><Text style={styles.ornamentDiamond}>◇</Text><View style={styles.ornamentLine} /></View>
      <Brand /><Text style={styles.loginTitle}>Tu estudio, en calma.</Text><Text style={styles.loginCopy}>Administra cada detalle de ZAJA STUDIO desde un solo lugar.</Text>
      <View style={styles.loginCard}><Text style={styles.eyebrow}>ACCESO PRIVADO</Text><View style={styles.inputFake}><Text style={styles.inputHint}>Correo de administración</Text></View><View style={styles.inputFake}><Text style={styles.inputHint}>Contraseña</Text><Text style={styles.eye}>◉</Text></View><GoldButton label="INGRESAR  ›" onPress={() => setEntered(true)} /><Text style={styles.demoNote}>Vista de muestra · acceso de demostración</Text></View>
      <Text style={styles.loginFooter}>BELLEZA EN CADA DETALLE</Text>
    </View></SafeAreaView>;

  const nav = ['Inicio', 'Agenda', 'Servicios', 'Frecuentes', 'Horarios'];
  return <SafeAreaView style={styles.safe}><StatusBar barStyle="dark-content" backgroundColor={C.bone} />
    <View style={styles.topBar}><Brand /><TouchableOpacity style={styles.avatar}><Text style={styles.avatarText}>Z</Text></TouchableOpacity></View>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {tab === 'Inicio' && <>
        <Text style={styles.greeting}>DOMINGO, 22 DE NOVIEMBRE</Text><Text style={styles.heading}>Buenos días, Zaja</Text><Text style={styles.subheading}>Tu estudio está listo para recibirte.</Text>
        <View style={styles.summaryRow}><View style={[styles.summaryCard, styles.summaryDark]}><Text style={[styles.summaryLabel,{color:C.paper}]}>CITAS HOY</Text><Text style={[styles.summaryNumber,{color:C.paper}]}>02</Text><Text style={[styles.summaryFoot,{color:C.paper}]}>en tu agenda</Text></View><View style={styles.summaryCard}><Text style={styles.summaryLabel}>POR CONFIRMAR</Text><Text style={[styles.summaryNumber, { color: C.gold }]}>{String(pending).padStart(2, '0')}</Text><Text style={styles.summaryFoot}>solicitudes nuevas</Text></View></View>
        <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Solicitudes recientes</Text><TouchableOpacity onPress={() => setTab('Agenda')}><Text style={styles.link}>Ver agenda  ›</Text></TouchableOpacity></View>
        {bookings.filter(b => b.status === 'pending').map(b => <BookingCard key={b.id} booking={b} onApprove={() => updateBooking(b.id, 'confirmed')} onReject={() => updateBooking(b.id, 'rejected')} />)}
        <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Próxima cita</Text><Text style={styles.miniDate}>LUN · 23 NOV</Text></View>
        <View style={styles.nextCard}><View style={styles.nextTime}><Text style={styles.nextHour}>11:00</Text><Text style={styles.nextMeridiem}>A. M.</Text></View><View style={styles.verticalRule} /><View style={{ flex: 1 }}><Text style={styles.nextName}>Lucía Mendoza</Text><Text style={styles.nextService}>Retiro + manicure clásica</Text></View><Text style={styles.confirmedMark}>✓</Text></View>
      </>}
      {tab === 'Agenda' && <><Text style={styles.greeting}>TU SEMANA</Text><Text style={styles.heading}>Agenda</Text><Text style={styles.subheading}>Noviembre 2026</Text><View style={styles.calendar}>{['L','M','X','J','V','S','D'].map((d,i)=><Text key={i} style={styles.weekday}>{d}</Text>)}{Array.from({ length: 35 }, (_,i)=>{const day=i-5;const valid=day>0&&day<=30;return <TouchableOpacity key={i} disabled={!valid} onPress={()=>setSelectedDay(day)} style={[styles.dayCell, day===selectedDay&&styles.daySelected]}><Text style={[styles.dayText, !valid&&styles.dayMuted, day===selectedDay&&styles.daySelectedText]}>{valid?day:''}</Text>{[22,23,25].includes(day)&&<View style={[styles.dayDot, day===selectedDay&&{backgroundColor:C.white}]} />}</TouchableOpacity>})}</View><View style={styles.sectionHead}><Text style={styles.sectionTitle}>Domingo, 22 nov.</Text><Text style={styles.miniDate}>2 CITAS</Text></View>{bookings.filter(b=>b.status==='confirmed'||b.status==='pending').map(b=><BookingCard key={b.id} booking={b} onApprove={()=>updateBooking(b.id,'confirmed')} onReject={()=>updateBooking(b.id,'rejected')} />)}</>}
      {tab === 'Servicios' && <><Text style={styles.greeting}>TU CATÁLOGO</Text><Text style={styles.heading}>Servicios</Text><Text style={styles.subheading}>Elige los detalles de cada experiencia.</Text>{services.map((s,i)=><View key={s.name} style={styles.serviceCard}><View style={styles.serviceNumber}><Text style={styles.serviceNumberText}>0{i+1}</Text></View><View style={{flex:1}}><Text style={styles.serviceName}>{s.name}</Text><Text style={styles.serviceDetail}>{s.detail}</Text></View><Text style={styles.servicePrice}>{s.price}</Text><Text style={styles.serviceEdit}>···</Text></View>)}<GoldButton label="＋  AGREGAR SERVICIO" onPress={()=>{}} secondary /></>}
      {tab === 'Horarios' && <><Text style={styles.greeting}>DISPONIBILIDAD</Text><Text style={styles.heading}>Tus horarios</Text><Text style={styles.subheading}>Activa los días en que recibes citas.</Text><View style={styles.hoursCard}>{Object.entries(openDays).map(([day,isOpen],i)=><View key={day} style={[styles.hourRow,i>0&&styles.rowBorder]}><View style={styles.dayBadge}><Text style={styles.dayBadgeText}>{day}</Text></View><Text style={styles.hourDay}>{['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'][i]}</Text><Text style={styles.hourRange}>{isOpen?'9:00 a. m. – 6:00 p. m.':'Cerrado'}</Text><TouchableOpacity onPress={()=>setOpenDays(v=>({...v,[day]:!v[day]}))} style={[styles.switch,isOpen&&styles.switchOn]}><View style={[styles.switchKnob,isOpen&&styles.switchKnobOn]} /></TouchableOpacity></View>)}</View><Text style={styles.helper}>Los horarios y duración de citas se pueden ajustar por día.</Text><GoldButton label="EDITAR HORAS DE ATENCIÓN" onPress={()=>{}} secondary /></>}
      {tab === 'Frecuentes' && <FrequentClientsView
        clients={loyaltyClients}
        selectedClient={loyaltyClients.find(client => client.id === selectedLoyaltyId)}
        services={services}
        rewardService={rewardService}
        onSelectService={setRewardService}
        onOpen={id => { setSelectedLoyaltyId(id); setRewardService('Manicure clásica'); }}
        onBack={() => setSelectedLoyaltyId(null)}
        onStamp={id => setLoyaltyClients(current => current.map(client => client.id === id ? { ...client, stamps: Math.min(6, client.stamps + 1), lastVisit: 'Visita registrada' } : client))}
        onRedeem={client => {
          const chosen = services.find(service => service.name === rewardService) || services[2];
          const difference = Math.max(0, chosen.amount - BASIC_REWARD_VALUE);
          setLoyaltyClients(current => current.map(item => item.id === client.id ? { ...item, stamps: 0 } : item));
          Alert.alert('Beneficio canjeado', difference ? `${chosen.name}. Diferencia a pagar: S/ ${difference}.` : 'Atención básica de uñas sin costo.');
        }}
      />}
    </ScrollView>
    <View style={styles.bottomNav}>{nav.map(n=><TouchableOpacity key={n} onPress={()=>{setTab(n);setSelectedLoyaltyId(null);}} style={styles.navItem}><Text style={[styles.navIcon,tab===n&&styles.navActive]}>{({Inicio:'⌂',Agenda:'▦',Servicios:'✧',Frecuentes:'♡',Horarios:'◷'})[n]}</Text><Text style={[styles.navLabel,tab===n&&styles.navLabelActive]}>{n}</Text>{tab===n&&<View style={styles.navDot}/>}</TouchableOpacity>)}</View>
  </SafeAreaView>;
}

function BookingCard({ booking, onApprove, onReject }) {
  return <View style={styles.bookingCard}><View style={styles.bookingTop}><View style={[styles.personCircle,{backgroundColor:booking.color}]}><Text style={styles.personInitials}>{booking.initials}</Text></View><View style={{flex:1}}><Text style={styles.personName}>{booking.name}</Text><Text style={styles.bookingService}>{booking.service}</Text></View><Text style={[styles.statusPill, booking.status==='confirmed'&&styles.confirmPill]}>{booking.status==='confirmed'?'CONFIRMADA':'NUEVA'}</Text></View><View style={styles.bookingMeta}><Text style={styles.metaText}>◷  {booking.date}</Text><Text style={styles.metaText}>⌁  {booking.duration}</Text></View>{booking.status==='pending'&&<View style={styles.actions}><GoldButton label="ACEPTAR" onPress={onApprove} compact /><GoldButton label="RECHAZAR" onPress={onReject} compact secondary /></View>}</View>;
}

function StampProgress({ count }) {
  return <View style={styles.stampRow}>{Array.from({ length: 6 }, (_, index) => {
    const filled = index < count;
    return <View key={index} style={[styles.stamp, filled && styles.stampFilled]}><Text style={[styles.stampIcon, filled && styles.stampIconFilled]}>{filled ? '✦' : '○'}</Text></View>;
  })}</View>;
}

function FrequentClientsView({ clients, selectedClient, services, rewardService, onSelectService, onOpen, onBack, onStamp, onRedeem }) {
  if (!selectedClient) return <>
    <Text style={styles.greeting}>BENEFICIO DE FIDELIDAD</Text>
    <Text style={styles.heading}>Clientes frecuentes</Text>
    <Text style={styles.subheading}>Un sello por cada visita atendida. Al completar seis, elige su beneficio.</Text>
    <View style={styles.loyaltyInfo}><Text style={styles.loyaltyInfoTitle}>6 VISITAS · 1 ATENCIÓN BÁSICA GRATIS</Text><Text style={styles.loyaltyInfoCopy}>Si prefiere otro servicio, solo paga la diferencia.</Text></View>
    {clients.map(client => <TouchableOpacity key={client.id} activeOpacity={0.8} onPress={() => onOpen(client.id)} style={styles.loyaltyCard}>
      <View style={styles.loyaltyClientTop}><View style={[styles.personCircle, { backgroundColor: client.color }]}><Text style={styles.personInitials}>{client.initials}</Text></View><View style={{ flex: 1 }}><Text style={styles.personName}>{client.name}</Text><Text style={styles.bookingService}>{client.lastVisit}</Text></View><Text style={[styles.loyaltyCount, client.stamps === 6 && styles.loyaltyReady]}>{client.stamps === 6 ? 'PREMIO LISTO' : `${client.stamps}/6 SELLOS`}</Text></View>
      <StampProgress count={client.stamps} />
      <View style={styles.loyaltyCardFoot}><Text style={styles.loyaltyProgress}>{client.stamps === 6 ? 'Beneficio disponible para canjear' : `Faltan ${6 - client.stamps} ${6 - client.stamps === 1 ? 'visita' : 'visitas'}`}</Text><Text style={styles.link}>Ver tarjeta  ›</Text></View>
    </TouchableOpacity>)}
  </>;

  const rewardReady = selectedClient.stamps >= 6;
  const chosenService = services.find(service => service.name === rewardService) || services[2];
  const difference = Math.max(0, chosenService.amount - BASIC_REWARD_VALUE);
  return <>
    <TouchableOpacity onPress={onBack} style={styles.backLink}><Text style={styles.link}>‹  Clientes frecuentes</Text></TouchableOpacity>
    <Text style={styles.greeting}>TARJETA DE FIDELIDAD</Text>
    <Text style={styles.heading}>{selectedClient.name}</Text>
    <Text style={styles.subheading}>{selectedClient.lastVisit}</Text>
    <View style={styles.loyaltyCard}><View style={styles.loyaltyClientTop}><View style={[styles.personCircle, { backgroundColor: selectedClient.color }]}><Text style={styles.personInitials}>{selectedClient.initials}</Text></View><View style={{ flex: 1 }}><Text style={styles.personName}>Visitas registradas</Text><Text style={styles.bookingService}>{selectedClient.stamps} de 6 sellos</Text></View><Text style={[styles.loyaltyCount, rewardReady && styles.loyaltyReady]}>{rewardReady ? 'COMPLETA' : 'EN CURSO'}</Text></View><StampProgress count={selectedClient.stamps} /></View>
    {!rewardReady ? <>
      <Text style={styles.helper}>Marca una visita aquí después de atender a la clienta.</Text>
      <GoldButton label="REGISTRAR VISITA Y SELLO" onPress={() => onStamp(selectedClient.id)} />
    </> : <>
      <View style={styles.rewardCard}><Text style={styles.eyebrow}>BENEFICIO DISPONIBLE</Text><Text style={styles.rewardTitle}>Una atención básica de uñas gratis</Text><Text style={styles.rewardCopy}>Valor de referencia: S/ {BASIC_REWARD_VALUE} · Manicure clásica</Text></View>
      <Text style={styles.sectionTitle}>¿Qué servicio desea?</Text>
      <Text style={styles.helper}>El beneficio cubre S/ {BASIC_REWARD_VALUE}. Solo se paga la diferencia del servicio elegido.</Text>
      {services.map(service => {
        const extra = Math.max(0, service.amount - BASIC_REWARD_VALUE);
        const isSelected = service.name === rewardService;
        return <TouchableOpacity key={service.name} onPress={() => onSelectService(service.name)} style={[styles.rewardService, isSelected && styles.rewardServiceSelected]}>
          <View style={{ flex: 1 }}><Text style={styles.serviceName}>{service.name}</Text><Text style={styles.serviceDetail}>{extra ? `Diferencia a pagar: S/ ${extra}` : 'Incluido en el beneficio'}</Text></View>
          <Text style={styles.servicePrice}>{extra ? service.price : 'GRATIS'}</Text>
        </TouchableOpacity>;
      })}
      <GoldButton label={difference ? `CANJEAR · PAGAR S/ ${difference}` : 'CANJEAR BENEFICIO GRATIS'} onPress={() => onRedeem(selectedClient)} />
    </>}
  </>;
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:C.bone}, login:{flex:1,alignItems:'center',justifyContent:'center',paddingHorizontal:28}, loginOrnament:{flexDirection:'row',alignItems:'center',width:170,marginBottom:28}, ornamentLine:{height:1,flex:1,backgroundColor:C.gold}, ornamentDiamond:{color:C.gold,fontSize:21,marginHorizontal:12}, brand:{alignItems:'center'}, brandName:{fontSize:29,letterSpacing:8,color:C.ink,fontWeight:'300'},brandSub:{fontSize:9,letterSpacing:4,color:C.gold,marginTop:4},loginTitle:{fontSize:25,color:C.ink,marginTop:30,fontWeight:'300'},loginCopy:{fontSize:13,color:C.muted,textAlign:'center',lineHeight:21,marginTop:10,maxWidth:280},loginCard:{width:'100%',backgroundColor:C.paper,borderRadius:5,padding:22,marginTop:30,borderWidth:1,borderColor:C.line},eyebrow:{fontSize:9,letterSpacing:2,color:C.oliveDark,marginBottom:16},inputFake:{height:48,borderBottomWidth:1,borderColor:C.line,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:12},inputHint:{fontSize:13,color:'#A4A398'},eye:{color:C.muted},goldButton:{padding:1,borderWidth:1,borderColor:C.gold,marginTop:14},goldInner:{backgroundColor:C.gold,minHeight:43,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#D4BD86',margin:2},goldText:{color:C.paper,fontSize:10,letterSpacing:1.4,fontWeight:'600'},secondaryButton:{borderColor:C.gold,backgroundColor:'transparent'},secondaryInner:{backgroundColor:'transparent',borderColor:'#D8C9A8'},secondaryText:{color:C.oliveDark},demoNote:{fontSize:10,color:C.muted,textAlign:'center',marginTop:13},loginFooter:{fontSize:8,letterSpacing:3,color:C.gold,marginTop:35},topBar:{height:68,paddingHorizontal:22,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:C.line},topBarBrand:{},avatar:{width:34,height:34,borderRadius:17,backgroundColor:C.olive,alignItems:'center',justifyContent:'center'},avatarText:{color:C.paper,fontSize:15},content:{paddingHorizontal:20,paddingTop:25,paddingBottom:24},greeting:{fontSize:9,letterSpacing:1.8,color:C.oliveDark,fontWeight:'600'},heading:{fontSize:29,color:C.ink,fontWeight:'300',marginTop:7},subheading:{fontSize:12,color:C.muted,marginTop:5,marginBottom:23},summaryRow:{flexDirection:'row',gap:11,marginBottom:28},summaryCard:{flex:1,backgroundColor:C.paper,borderRadius:4,borderWidth:1,borderColor:C.line,padding:15,minHeight:107},summaryDark:{backgroundColor:C.oliveDark,borderColor:C.oliveDark},summaryLabel:{fontSize:8,letterSpacing:1.2,color:C.muted},summaryDarkLabel:{},summaryNumber:{fontSize:30,color:C.ink,fontWeight:'300',marginTop:9},summaryFoot:{fontSize:10,color:C.muted,marginTop:1},sectionHead:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:12,marginTop:5},sectionTitle:{fontSize:16,color:C.ink,fontWeight:'400'},link:{fontSize:10,color:C.gold},bookingCard:{backgroundColor:C.paper,borderWidth:1,borderColor:C.line,borderRadius:4,padding:13,marginBottom:10},bookingTop:{flexDirection:'row',alignItems:'center',gap:10},personCircle:{width:39,height:39,borderRadius:20,alignItems:'center',justifyContent:'center'},personInitials:{fontSize:12,color:C.ink},personName:{fontSize:13,color:C.ink,fontWeight:'500'},bookingService:{fontSize:10,color:C.muted,marginTop:3},statusPill:{fontSize:7,letterSpacing:.8,color:C.gold,borderWidth:1,borderColor:'#D8C9A8',paddingHorizontal:7,paddingVertical:4},confirmPill:{color:C.oliveDark,borderColor:'#C9CFBB'},bookingMeta:{flexDirection:'row',gap:16,borderTopWidth:1,borderTopColor:C.line,marginTop:12,paddingTop:9},metaText:{fontSize:9,color:C.muted},actions:{flexDirection:'row',gap:9,marginTop:1},compactButton:{flex:1,marginTop:10},goldInnerCompact:{},nextCard:{backgroundColor:C.paper,borderWidth:1,borderColor:C.line,borderRadius:4,padding:15,flexDirection:'row',alignItems:'center',marginTop:1},nextTime:{alignItems:'center',width:48},nextHour:{fontSize:17,color:C.ink},nextMeridiem:{fontSize:8,color:C.muted,letterSpacing:1},verticalRule:{height:36,width:1,backgroundColor:C.gold,marginHorizontal:13},nextName:{fontSize:13,color:C.ink},nextService:{fontSize:10,color:C.muted,marginTop:4},confirmedMark:{color:C.oliveDark,fontSize:14},miniDate:{fontSize:8,letterSpacing:1,color:C.gold},bottomNav:{height:64,backgroundColor:C.paper,borderTopWidth:1,borderTopColor:C.line,flexDirection:'row',justifyContent:'space-around',alignItems:'center'},navItem:{alignItems:'center',justifyContent:'center',flex:1,height:'100%'},navIcon:{fontSize:18,color:C.muted,height:23},navActive:{color:C.gold},navLabel:{fontSize:8,color:C.muted,marginTop:1},navLabelActive:{color:C.oliveDark},navDot:{width:3,height:3,borderRadius:2,backgroundColor:C.gold,marginTop:3},calendar:{backgroundColor:C.paper,borderWidth:1,borderColor:C.line,padding:12,borderRadius:4,flexDirection:'row',flexWrap:'wrap',marginBottom:24},weekday:{width:'14.28%',textAlign:'center',fontSize:9,color:C.gold,marginBottom:8},dayCell:{width:'14.28%',height:42,alignItems:'center',justifyContent:'center'},daySelected:{backgroundColor:C.oliveDark,borderRadius:22},dayText:{fontSize:11,color:C.ink},dayMuted:{color:'transparent'},daySelectedText:{color:C.white},dayDot:{width:3,height:3,borderRadius:2,backgroundColor:C.gold,marginTop:3},serviceCard:{flexDirection:'row',alignItems:'center',backgroundColor:C.paper,borderWidth:1,borderColor:C.line,padding:13,marginBottom:9,borderRadius:4,gap:12},serviceNumber:{width:34,height:34,borderRadius:17,borderWidth:1,borderColor:C.gold,alignItems:'center',justifyContent:'center'},serviceNumberText:{fontSize:9,color:C.gold},serviceName:{fontSize:12,color:C.ink},serviceDetail:{fontSize:10,color:C.muted,marginTop:5},servicePrice:{fontSize:12,color:C.oliveDark},serviceEdit:{fontSize:19,color:C.gold,marginLeft:3},hoursCard:{backgroundColor:C.paper,borderWidth:1,borderColor:C.line,borderRadius:4,paddingHorizontal:13},hourRow:{height:59,flexDirection:'row',alignItems:'center',gap:9},rowBorder:{borderTopWidth:1,borderTopColor:C.line},dayBadge:{width:23,height:23,borderRadius:12,backgroundColor:C.bone,alignItems:'center',justifyContent:'center'},dayBadgeText:{fontSize:9,color:C.oliveDark},hourDay:{fontSize:11,color:C.ink,width:68},hourRange:{fontSize:8,color:C.muted,flex:1},switch:{width:31,height:18,borderRadius:10,backgroundColor:'#DAD8D0',padding:2,justifyContent:'center'},switchOn:{backgroundColor:C.olive},switchKnob:{width:14,height:14,borderRadius:7,backgroundColor:C.paper},switchKnobOn:{alignSelf:'flex-end',backgroundColor:C.white},helper:{fontSize:10,color:C.muted,lineHeight:16,marginVertical:15},
  loyaltyInfo:{backgroundColor:C.oliveDark,padding:16,borderRadius:4,marginBottom:16},loyaltyInfoTitle:{color:C.paper,fontSize:10,letterSpacing:1,fontWeight:'600'},loyaltyInfoCopy:{color:C.paper,fontSize:11,marginTop:7},loyaltyCard:{backgroundColor:C.paper,borderWidth:1,borderColor:C.line,borderRadius:4,padding:14,marginBottom:11},loyaltyClientTop:{flexDirection:'row',alignItems:'center',gap:10},loyaltyCount:{fontSize:8,letterSpacing:.6,color:C.gold,borderWidth:1,borderColor:'#D8C9A8',paddingHorizontal:7,paddingVertical:5},loyaltyReady:{color:C.oliveDark,borderColor:C.olive},stampRow:{flexDirection:'row',gap:8,marginTop:15,marginBottom:11},stamp:{flex:1,height:30,borderRadius:15,borderWidth:1,borderColor:'#D8C9A8',alignItems:'center',justifyContent:'center'},stampFilled:{backgroundColor:C.oliveDark,borderColor:C.oliveDark},stampIcon:{fontSize:12,color:C.gold},stampIconFilled:{color:C.paper},loyaltyCardFoot:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},loyaltyProgress:{fontSize:9,color:C.muted},backLink:{marginBottom:18,alignSelf:'flex-start'},rewardCard:{backgroundColor:C.paper,borderWidth:1,borderColor:C.gold,padding:16,marginTop:6,marginBottom:20},rewardTitle:{fontSize:16,color:C.ink,marginTop:4},rewardCopy:{fontSize:10,color:C.muted,marginTop:6},rewardService:{flexDirection:'row',alignItems:'center',backgroundColor:C.paper,borderWidth:1,borderColor:C.line,padding:13,marginTop:9,borderRadius:4,gap:12},rewardServiceSelected:{borderColor:C.gold,backgroundColor:'#FBF7ED'},
});

