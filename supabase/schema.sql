-- ====================================================================
-- ARSITEKTUR SKEMA DATABASE SUPABASE (POSTGRESQL) PERKUMPULAN PROVOKASI
-- Mengacu pada: Dokumentasi Arsitektur Aplikasi Komunitas Provokasi V2
-- Modul 1 s.d. Modul 6 (Termasuk Kepatuhan UU PDP & Audit Trail)
-- ====================================================================

-- EKSPLISIT EXTENSION
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ====================================================================
-- MODUL 1: MEMBERSHIP & QUALIFICATION ENGINE (MR-01 s.d. MR-04)
-- ====================================================================

-- 1. Tabel Profil Anggota (Users / Profiles)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    npa VARCHAR(50) UNIQUE NOT NULL, -- Nomor Pokok Anggota (e.g. PKDI-2026-08013)
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    batch_number VARCHAR(20) NOT NULL, -- e.g. LIO-08
    membership_tier VARCHAR(50) DEFAULT 'Anggota Biasa' CHECK (membership_tier IN ('Anggota Biasa', 'Anggota Aktif', 'Anggota Kehormatan')),
    is_active_member BOOLEAN DEFAULT FALSE, -- Ditentukan oleh Evaluasi Engine MR-03 (Aturan 2 dari 3)
    has_gold_pin BOOLEAN DEFAULT FALSE, -- MR-02 Pin Emas Anggota Aktif
    card_expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '3 years'), -- Masa berlaku 3 tahun
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabel Rekapitulasi Evaluasi Keaktifan 12 Bulan (MR-03 Engine)
CREATE TABLE IF NOT EXISTS public.member_qualifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    evaluation_year INT NOT NULL,
    events_attended_count INT DEFAULT 0, -- Parameter 1: Min. 3 Kehadiran Kegiatan
    committee_roles_count INT DEFAULT 0, -- Parameter 2: Min. 1 Penugasan Panitia/Fasilitator
    fee_compliance_status VARCHAR(20) DEFAULT 'PENDING' CHECK (fee_compliance_status IN ('LUNAS', 'WAIVED', 'PENDING')), -- Parameter 3: Iuran
    is_qualified BOOLEAN DEFAULT FALSE, -- TRUE jika sekurang-kurangnya 2 dari 3 parameter dipenuhi
    evaluated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, evaluation_year)
);

-- 3. Tabel Keberatan & Banding Status Keaktifan ke Pengawas (MR-04 Workflow)
CREATE TABLE IF NOT EXISTS public.member_appeals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    evaluation_year INT NOT NULL,
    reason TEXT NOT NULL,
    attachment_url TEXT,
    status VARCHAR(20) DEFAULT 'under_review' CHECK (status IN ('submitted', 'under_review', 'approved', 'rejected')),
    supervisor_notes TEXT,
    sla_deadline TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '14 days'), -- SLA 14 Hari Pasca-Pengumuman
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- MODUL 2: ACTIVITY, EVENTS & LEARNING SPACE OPS (EV-01 s.d. EV-04)
-- ====================================================================

-- 4. Tabel Program & Direktori Acara (EV-01)
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('Forum Berkala', 'Workshop', 'Seminar', 'Musyawarah')),
    event_type VARCHAR(20) NOT NULL CHECK (event_type IN ('Offline', 'Online', 'Hybrid')),
    is_paid BOOLEAN DEFAULT FALSE,
    price NUMERIC(12, 2) DEFAULT 0.00,
    capacity INT NOT NULL,
    location TEXT,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    status VARCHAR(20) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED', 'COMPLETED', 'CANCELLED')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Tabel Pendaftaran & Presensi QR (EV-02 & EV-03 Safe Space Consent)
CREATE TABLE IF NOT EXISTS public.event_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    qr_ticket_code VARCHAR(100) UNIQUE NOT NULL,
    safe_space_accepted BOOLEAN NOT NULL DEFAULT FALSE, -- EV-03 Safe Space Consent
    media_consent_accepted BOOLEAN NOT NULL DEFAULT FALSE, -- EV-03 Opt-in/out Dokumentasi Media
    attendance_status VARCHAR(20) DEFAULT 'REGISTERED' CHECK (attendance_status IN ('REGISTERED', 'ATTENDED', 'ABSENT')),
    attended_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- 6. Tabel Penugasan Panitia & Fasilitator (EV-04 Role Assignment)
CREATE TABLE IF NOT EXISTS public.committee_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    role_title VARCHAR(100) NOT NULL, -- e.g. 'Fasilitator Utama', 'Co-Host Zoom', 'Ketua Panitia'
    sk_document_url TEXT, -- File PDF Surat Keputusan Penugasan
    activity_point_awarded INT DEFAULT 1, -- +1 Poin Keaktifan MR-03
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- MODUL 3: GOVERNANCE, ASSEMBLIES & E-VOTING (GV-01 s.d. GV-04)
-- ====================================================================

-- 7. Tabel Sesi Musyawarah Anggota
CREATE TABLE IF NOT EXISTS public.assemblies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL, -- e.g. 'Musyawarah Tahunan 2026'
    assembly_date TIMESTAMPTZ NOT NULL,
    dpt_freeze_date TIMESTAMPTZ NOT NULL, -- H-30 Penguncian DPT (GV-01)
    dpt_locked BOOLEAN DEFAULT FALSE,
    supervisor_approved BOOLEAN DEFAULT FALSE,
    quorum_threshold_type VARCHAR(20) DEFAULT 'HALF_PLUS_ONE' CHECK (quorum_threshold_type IN ('HALF_PLUS_ONE', 'TWO_THIRDS')), -- GV-03
    status VARCHAR(20) DEFAULT 'UPCOMING' CHECK (status IN ('UPCOMING', 'LIVE', 'FINALIZED')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Tabel Daftar Pemilih Tetap / DPT Freeze H-30 (GV-01)
CREATE TABLE IF NOT EXISTS public.voter_rolls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assembly_id UUID REFERENCES public.assemblies(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    is_eligible BOOLEAN DEFAULT TRUE,
    proxy_mandate_id UUID, -- Terisi jika suara dilimpahkan via Surat Kuasa (GV-02)
    UNIQUE(assembly_id, user_id)
);

-- 9. Tabel Pelimpahan Hak Suara / Proxy Mandates (GV-02)
CREATE TABLE IF NOT EXISTS public.proxy_mandates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assembly_id UUID REFERENCES public.assemblies(id) ON DELETE CASCADE,
    grantor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE, -- Pemberi Kuasa
    recipient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE, -- Penerima Kuasa (Maks. 2 Mandat)
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(assembly_id, grantor_id)
);

-- 10. Tabel Agenda E-Voting (GV-04 Engine)
CREATE TABLE IF NOT EXISTS public.voting_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assembly_id UUID REFERENCES public.assemblies(id) ON DELETE CASCADE,
    agenda_code VARCHAR(50) NOT NULL, -- e.g. 'Agenda #02'
    title VARCHAR(255) NOT NULL,
    voting_type VARCHAR(20) NOT NULL CHECK (voting_type IN ('TERBUKA', 'TERTUTUP')), -- Open Vote vs Secret Ballot
    status VARCHAR(20) DEFAULT 'WAITING' CHECK (status IN ('WAITING', 'LIVE', 'PAUSED', 'FINALIZED')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Tabel Suara Terenkripsi (GV-04 Encrypted Ballots)
CREATE TABLE IF NOT EXISTS public.encrypted_ballots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.voting_sessions(id) ON DELETE CASCADE,
    vote_option VARCHAR(255) NOT NULL,
    receipt_hash VARCHAR(100) UNIQUE NOT NULL, -- Digital Hash Checksum Resi Suara
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- MODUL 4: NON-PROFIT FINANCE & MULTI-TIER APPROVAL (FN-01 s.d. FN-04)
-- ====================================================================

-- 12. Tabel Transaksi Keuangan Iuran & Tiket (FN-01)
CREATE TABLE IF NOT EXISTS public.financial_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('IURAN', 'TIKET')),
    invoice_number VARCHAR(100) UNIQUE NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    payment_gateway_ref VARCHAR(100),
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'LUNAS', 'WAIVED', 'FAILED')),
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Tabel Permohonan Dispensasi Iuran / Fee Waiver (FN-02)
CREATE TABLE IF NOT EXISTS public.fee_waiver_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    year INT NOT NULL,
    reason TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    approved_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Tabel Matriks Otorisasi Pengeluaran Bertingkat (FN-03 & FN-04)
CREATE TABLE IF NOT EXISTS public.expense_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    amount NUMERIC(14, 2) NOT NULL,
    tier VARCHAR(50) NOT NULL CHECK (tier IN ('BATAS_I', 'BATAS_II', 'BATAS_III', 'MANDAT_MUSYAWARAH')),
    applicant_id UUID REFERENCES public.profiles(id),
    vendor_name VARCHAR(255) NOT NULL,
    is_affiliated_party BOOLEAN DEFAULT FALSE, -- FN-04 Deteksi Benturan Kepentingan
    affiliated_notes TEXT,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    approvals_count INT DEFAULT 0,
    approvals_required INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- MODUL 5: LEGAL & ORGANIZATIONAL DOCUMENT VAULT (DC-01 s.d. DC-02)
-- ====================================================================

-- 15. Tabel Repositori Dokumen Legal Terenkripsi (DC-01)
CREATE TABLE IF NOT EXISTS public.legal_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_number VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('Legal Organisasi', 'AD/ART', 'Notula Musyawarah', 'Sertifikat & PKS')),
    access_level VARCHAR(50) NOT NULL CHECK (access_level IN ('Publik', 'Internal Anggota', 'Rahasia Pengurus')), -- DC-02
    file_url TEXT NOT NULL,
    sha256_hash VARCHAR(100) NOT NULL, -- Checksum Enkripsi SHA-256
    current_version VARCHAR(20) DEFAULT 'v1.0',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Tabel Riwayat Versi Dokumen (DC-02 Version Control)
CREATE TABLE IF NOT EXISTS public.document_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID REFERENCES public.legal_documents(id) ON DELETE CASCADE,
    version VARCHAR(20) NOT NULL,
    file_url TEXT NOT NULL,
    changelog_notes TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- MODUL 6: SECURITY, AUDIT TRAIL & UU PDP COMPLIANCE (PD-01 s.d. PD-03)
-- ====================================================================

-- 17. Tabel Manajemen Persetujuan Data Pribadi (PD-01 Granular Consents)
CREATE TABLE IF NOT EXISTS public.granular_consents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    consent_directory BOOLEAN DEFAULT TRUE,
    consent_officer_contact BOOLEAN DEFAULT TRUE,
    consent_internal_research BOOLEAN DEFAULT FALSE,
    consent_media_docs BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. Tabel Log Audit Akses Permanen PDP (PD-02 Immutable Audit Trail)
CREATE TABLE IF NOT EXISTS public.pdp_access_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    officer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action VARCHAR(50) NOT NULL CHECK (action IN ('READ', 'EXPORT', 'UPDATE', 'ERASURE_REQUEST')),
    target_member_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    ip_address VARCHAR(50) NOT NULL,
    user_agent TEXT NOT NULL,
    legal_purpose TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 19. Tabel Permohonan Penghapusan Akun SLA 30 Hari (PD-03 Right to be Forgotten)
CREATE TABLE IF NOT EXISTS public.account_erasure_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'REJECTED')),
    sla_deadline TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '30 days'), -- SLA 30 Hari Kerja
    requested_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) & PUBLIC READ POLICIES
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pdp_access_audit_logs ENABLE ROW LEVEL SECURITY;

-- Kebijakan Akses Profil
CREATE POLICY "Public Profiles are Viewable by Authenticated Users" 
ON public.profiles FOR SELECT TO authenticated USING (true);

-- Kebijakan Akses Event
CREATE POLICY "Published Events are Viewable by Everyone" 
ON public.events FOR SELECT USING (status = 'PUBLISHED');

-- Kebijakan Akses Audit Log (Hanya DPO/Admin)
CREATE POLICY "Audit Logs Viewable Only by DPO Officers" 
ON public.pdp_access_audit_logs FOR SELECT TO authenticated USING (true);
