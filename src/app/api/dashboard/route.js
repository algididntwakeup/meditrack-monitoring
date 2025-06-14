// src/app/api/dashboard/route.js

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'; // Pastikan path ini benar

// Fungsi ini akan menangani request GET ke /api/dashboard
export async function GET() {
  try {
    // 1. Ambil semua data laporan, sekaligus data nakes yang berelasi
    const { data: laporan, error } = await supabase
      .from('laporan_kinerja')
      .select(`
        jumlah_pasien,
        waktu_tunggu_rata_rata,
        jumlah_konsultasi,
        tenaga_kesehatan (
          nama,
          role
        )
      `);

    // 2. Jika ada error saat mengambil data, kirim response error
    if (error) {
      console.error('Error fetching data from Supabase:', error);
      throw new Error(error.message);
    }

    // 3. Proses data mentah menjadi informasi yang siap ditampilkan
    const totalPasien = laporan.reduce((acc, curr) => acc + curr.jumlah_pasien, 0);
    const totalKonsultasi = laporan.reduce((acc, curr) => acc + curr.jumlah_konsultasi, 0);
    const avgWaktuTunggu = laporan.length > 0
      ? (laporan.reduce((acc, curr) => acc + curr.waktu_tunggu_rata_rata, 0) / laporan.length).toFixed(0)
      : 0;

    // 4. Ubah format laporan kinerja agar sesuai dengan yang dibutuhkan frontend
    const laporanKinerjaFormatted = laporan.map(item => ({
      nama: item.tenaga_kesehatan.nama,
      role: item.tenaga_kesehatan.role,
      pasien: item.jumlah_pasien,
      konsultasi: item.jumlah_konsultasi,
      waktuTunggu: `${item.waktu_tunggu_rata_rata} min`,
    }));

    // Data untuk grafik (untuk saat ini kita pakai data dummy)
    const kinerjaTimChartData = [
        { name: 'Jan', value: 400 },
        { name: 'Feb', value: 300 },
        { name: 'Mar', value: 500 },
        { name: 'Apr', value: 278 },
        { name: 'May', value: 189 },
        { name: 'Jun', value: 239 },
    ];

    // 5. Susun data final yang akan dikirim sebagai response
    const responseData = {
      totalPasien,
      pasienTerkini: totalKonsultasi, // Asumsikan pasien terkini = jumlah konsultasi hari ini
      waktuTunggu: avgWaktuTunggu,
      laporanKinerja: laporanKinerjaFormatted,
      kinerjaTim: kinerjaTimChartData,
    };

    // 6. Kirim data sebagai JSON dengan status 200 (OK)
    return NextResponse.json(responseData, { status: 200 });

  } catch (e) {
    // Tangani error tak terduga
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}