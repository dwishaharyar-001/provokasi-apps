-- ====================================================================
-- SEED DATA - INITIAL ADMIN
-- ====================================================================

-- 1. Insert into auth.users (Supabase Auth)
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', -- Static UUID for Admin
    'authenticated',
    'authenticated',
    'admin@provokasi.org',
    crypt('Provok451!Admin2026$$', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW()
) ON CONFLICT (id) DO NOTHING;

-- 2. Insert into public.profiles
INSERT INTO public.profiles (
    id,
    npa,
    full_name,
    email,
    phone,
    batch_number,
    membership_tier,
    system_role,
    registration_status,
    is_active_member,
    has_gold_pin
) VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'PROV-ADMIN-001',
    'Provokasi-Admin Apps',
    'admin@provokasi.org',
    '081234567890',
    'ADMIN',
    'Anggota Kehormatan',
    'SYSTEM_ADMIN',
    'APPROVED',
    TRUE,
    TRUE
) ON CONFLICT (id) DO NOTHING;
