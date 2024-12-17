﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using api.Data;

#nullable disable

namespace api.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20241217090056_AddDurationMinsToService")]
    partial class AddDurationMinsToService
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("api.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("MerchantId")
                        .HasColumnType("integer");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("MerchantId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("api.Models.Customer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("MerchantId")
                        .HasColumnType("integer");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("MerchantId");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("api.Models.Discount", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("ExpiresOn")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("MerchantId")
                        .HasColumnType("integer");

                    b.Property<decimal>("Percentage")
                        .HasColumnType("decimal(5, 2)");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("MerchantId");

                    b.ToTable("Discounts");
                });

            modelBuilder.Entity("api.Models.Employee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("EmployeeType")
                        .HasColumnType("integer");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("MerchantId")
                        .HasColumnType("integer");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("MerchantId");

                    b.HasIndex("Username")
                        .IsUnique()
                        .HasDatabaseName("IX_Employee_Username");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("api.Models.GiftCard", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Balance")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Currency")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("ExpiresOn")
                        .HasColumnType("timestamp with time zone");

                    b.Property<decimal>("InitialBalance")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<int>("MerchantId")
                        .HasColumnType("integer");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("MerchantId");

                    b.ToTable("GiftCards");
                });

            modelBuilder.Entity("api.Models.Merchant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("VAT")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Merchants");
                });

            modelBuilder.Entity("api.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("MerchantId")
                        .HasColumnType("integer");

                    b.Property<int?>("OrderDiscountId")
                        .HasColumnType("integer");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("MerchantId");

                    b.HasIndex("OrderDiscountId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("api.Models.OrderDiscount", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("MerchantId")
                        .HasColumnType("integer");

                    b.Property<int>("Percentage")
                        .HasColumnType("integer");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("MerchantId");

                    b.ToTable("OrderDiscounts");
                });

            modelBuilder.Entity("api.Models.OrderItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("OrderId")
                        .HasColumnType("integer");

                    b.Property<int>("ProductVariantId")
                        .HasColumnType("integer");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.HasIndex("ProductVariantId");

                    b.ToTable("OrderItems");
                });

            modelBuilder.Entity("api.Models.Payment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Currency")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("GiftcardId")
                        .HasColumnType("integer");

                    b.Property<int>("MerchantId")
                        .HasColumnType("integer");

                    b.Property<int>("Method")
                        .HasColumnType("integer");

                    b.Property<int?>("OrderId")
                        .HasColumnType("integer");

                    b.Property<int>("PaymentType")
                        .HasColumnType("integer");

                    b.Property<int?>("RefundId")
                        .HasColumnType("integer");

                    b.Property<int?>("ReservationId")
                        .HasColumnType("integer");

                    b.Property<decimal>("TipAmount")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<decimal>("TotalAmount")
                        .HasColumnType("decimal(18, 2)");

                    b.HasKey("Id");

                    b.HasIndex("GiftcardId");

                    b.HasIndex("MerchantId");

                    b.HasIndex("OrderId");

                    b.HasIndex("ReservationId");

                    b.ToTable("Payments");
                });

            modelBuilder.Entity("api.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("CategoryId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("DiscountId")
                        .HasColumnType("integer");

                    b.Property<int>("MerchantId")
                        .HasColumnType("integer");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<int?>("TaxId")
                        .HasColumnType("integer");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<decimal>("Weight")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<string>("WeightUnit")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("DiscountId");

                    b.HasIndex("MerchantId");

                    b.HasIndex("TaxId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("api.Models.ProductVariant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<decimal>("AdditionalPrice")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("ProductId")
                        .HasColumnType("integer");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.ToTable("ProductVariants");
                });

            modelBuilder.Entity("api.Models.Refund", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("MerchantId")
                        .HasColumnType("integer");

                    b.Property<int>("PaymentId")
                        .HasColumnType("integer");

                    b.Property<string>("Reason")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("MerchantId");

                    b.HasIndex("PaymentId")
                        .IsUnique();

                    b.ToTable("Refunds");
                });

            modelBuilder.Entity("api.Models.Reservation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("CustomerId")
                        .HasColumnType("integer");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("EndTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("SendConfirmation")
                        .HasColumnType("boolean");

                    b.Property<int>("ServiceId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("ServiceId");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("api.Models.Service", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("CategoryId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("DiscountId")
                        .HasColumnType("integer");

                    b.Property<int>("DurationMins")
                        .HasColumnType("integer");

                    b.Property<int?>("EmployeeId")
                        .HasColumnType("integer");

                    b.Property<int>("MerchantId")
                        .HasColumnType("integer");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<int?>("TaxId")
                        .HasColumnType("integer");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("DiscountId");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("MerchantId");

                    b.HasIndex("TaxId");

                    b.ToTable("Services");
                });

            modelBuilder.Entity("api.Models.Tax", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("MerchantId")
                        .HasColumnType("integer");

                    b.Property<int>("Percentage")
                        .HasColumnType("integer");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("MerchantId");

                    b.ToTable("Taxes");
                });

            modelBuilder.Entity("api.Models.Category", b =>
                {
                    b.HasOne("api.Models.Merchant", "Merchant")
                        .WithMany("Categories")
                        .HasForeignKey("MerchantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Merchant");
                });

            modelBuilder.Entity("api.Models.Customer", b =>
                {
                    b.HasOne("api.Models.Merchant", "Merchant")
                        .WithMany("Customers")
                        .HasForeignKey("MerchantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Merchant");
                });

            modelBuilder.Entity("api.Models.Discount", b =>
                {
                    b.HasOne("api.Models.Merchant", "Merchant")
                        .WithMany("Discounts")
                        .HasForeignKey("MerchantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Merchant");
                });

            modelBuilder.Entity("api.Models.Employee", b =>
                {
                    b.HasOne("api.Models.Merchant", "Merchant")
                        .WithMany("Employees")
                        .HasForeignKey("MerchantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Merchant");
                });

            modelBuilder.Entity("api.Models.GiftCard", b =>
                {
                    b.HasOne("api.Models.Merchant", "Merchant")
                        .WithMany("GiftCards")
                        .HasForeignKey("MerchantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Merchant");
                });

            modelBuilder.Entity("api.Models.Merchant", b =>
                {
                    b.OwnsOne("api.Models.Address", "Address", b1 =>
                        {
                            b1.Property<int>("MerchantId")
                                .HasColumnType("integer");

                            b1.Property<string>("Address1")
                                .IsRequired()
                                .HasColumnType("text");

                            b1.Property<string>("Address2")
                                .HasColumnType("text");

                            b1.Property<string>("City")
                                .IsRequired()
                                .HasColumnType("text");

                            b1.Property<string>("Country")
                                .IsRequired()
                                .HasColumnType("text");

                            b1.Property<string>("CountryCode")
                                .IsRequired()
                                .HasColumnType("text");

                            b1.Property<string>("ZipCode")
                                .IsRequired()
                                .HasColumnType("text");

                            b1.HasKey("MerchantId");

                            b1.ToTable("Merchants");

                            b1.WithOwner()
                                .HasForeignKey("MerchantId");
                        });

                    b.Navigation("Address")
                        .IsRequired();
                });

            modelBuilder.Entity("api.Models.Order", b =>
                {
                    b.HasOne("api.Models.Merchant", "Merchant")
                        .WithMany("Orders")
                        .HasForeignKey("MerchantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.OrderDiscount", "OrderDiscount")
                        .WithMany()
                        .HasForeignKey("OrderDiscountId");

                    b.OwnsOne("api.Models.Price", "TotalAmount", b1 =>
                        {
                            b1.Property<int>("OrderId")
                                .HasColumnType("integer");

                            b1.Property<decimal>("Amount")
                                .HasColumnType("decimal(18, 2)");

                            b1.Property<int>("Currency")
                                .HasColumnType("integer");

                            b1.HasKey("OrderId");

                            b1.ToTable("Orders");

                            b1.WithOwner()
                                .HasForeignKey("OrderId");
                        });

                    b.Navigation("Merchant");

                    b.Navigation("OrderDiscount");

                    b.Navigation("TotalAmount")
                        .IsRequired();
                });

            modelBuilder.Entity("api.Models.OrderDiscount", b =>
                {
                    b.HasOne("api.Models.Merchant", "Merchant")
                        .WithMany("OrderDiscounts")
                        .HasForeignKey("MerchantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Merchant");
                });

            modelBuilder.Entity("api.Models.OrderItem", b =>
                {
                    b.HasOne("api.Models.Order", "Order")
                        .WithMany("OrderItems")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.ProductVariant", "ProductVariant")
                        .WithMany("OrderItems")
                        .HasForeignKey("ProductVariantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.OwnsOne("api.Models.Price", "Price", b1 =>
                        {
                            b1.Property<int>("OrderItemId")
                                .HasColumnType("integer");

                            b1.Property<decimal>("Amount")
                                .HasColumnType("decimal(18, 2)");

                            b1.Property<int>("Currency")
                                .HasColumnType("integer");

                            b1.HasKey("OrderItemId");

                            b1.ToTable("OrderItems");

                            b1.WithOwner()
                                .HasForeignKey("OrderItemId");
                        });

                    b.Navigation("Order");

                    b.Navigation("Price")
                        .IsRequired();

                    b.Navigation("ProductVariant");
                });

            modelBuilder.Entity("api.Models.Payment", b =>
                {
                    b.HasOne("api.Models.GiftCard", "GiftCard")
                        .WithMany("Payments")
                        .HasForeignKey("GiftcardId");

                    b.HasOne("api.Models.Merchant", "Merchant")
                        .WithMany()
                        .HasForeignKey("MerchantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.Order", "Order")
                        .WithMany("Payments")
                        .HasForeignKey("OrderId");

                    b.HasOne("api.Models.Reservation", "Reservation")
                        .WithMany("Payments")
                        .HasForeignKey("ReservationId");

                    b.Navigation("GiftCard");

                    b.Navigation("Merchant");

                    b.Navigation("Order");

                    b.Navigation("Reservation");
                });

            modelBuilder.Entity("api.Models.Product", b =>
                {
                    b.HasOne("api.Models.Category", "Category")
                        .WithMany("Products")
                        .HasForeignKey("CategoryId");

                    b.HasOne("api.Models.Discount", "Discount")
                        .WithMany("Products")
                        .HasForeignKey("DiscountId");

                    b.HasOne("api.Models.Merchant", "Merchant")
                        .WithMany("Products")
                        .HasForeignKey("MerchantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.Tax", "Tax")
                        .WithMany("Products")
                        .HasForeignKey("TaxId");

                    b.OwnsOne("api.Models.Price", "Price", b1 =>
                        {
                            b1.Property<int>("ProductId")
                                .HasColumnType("integer");

                            b1.Property<decimal>("Amount")
                                .HasColumnType("decimal(18, 2)");

                            b1.Property<int>("Currency")
                                .HasColumnType("integer");

                            b1.HasKey("ProductId");

                            b1.ToTable("Products");

                            b1.WithOwner()
                                .HasForeignKey("ProductId");
                        });

                    b.Navigation("Category");

                    b.Navigation("Discount");

                    b.Navigation("Merchant");

                    b.Navigation("Price")
                        .IsRequired();

                    b.Navigation("Tax");
                });

            modelBuilder.Entity("api.Models.ProductVariant", b =>
                {
                    b.HasOne("api.Models.Product", "Product")
                        .WithMany("ProductVariants")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Product");
                });

            modelBuilder.Entity("api.Models.Refund", b =>
                {
                    b.HasOne("api.Models.Merchant", "Merchant")
                        .WithMany()
                        .HasForeignKey("MerchantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.Payment", "Payment")
                        .WithOne("Refund")
                        .HasForeignKey("api.Models.Refund", "PaymentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.OwnsOne("api.Models.Price", "RefundAmount", b1 =>
                        {
                            b1.Property<int>("RefundId")
                                .HasColumnType("integer");

                            b1.Property<decimal>("Amount")
                                .HasColumnType("decimal(18, 2)");

                            b1.Property<int>("Currency")
                                .HasColumnType("integer");

                            b1.HasKey("RefundId");

                            b1.ToTable("Refunds");

                            b1.WithOwner()
                                .HasForeignKey("RefundId");
                        });

                    b.Navigation("Merchant");

                    b.Navigation("Payment");

                    b.Navigation("RefundAmount")
                        .IsRequired();
                });

            modelBuilder.Entity("api.Models.Reservation", b =>
                {
                    b.HasOne("api.Models.Customer", "Customer")
                        .WithMany("Reservations")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.Employee", "Employee")
                        .WithMany("Reservations")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.Service", "Service")
                        .WithMany("Reservations")
                        .HasForeignKey("ServiceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Customer");

                    b.Navigation("Employee");

                    b.Navigation("Service");
                });

            modelBuilder.Entity("api.Models.Service", b =>
                {
                    b.HasOne("api.Models.Category", "Category")
                        .WithMany("Services")
                        .HasForeignKey("CategoryId");

                    b.HasOne("api.Models.Discount", "Discount")
                        .WithMany("Services")
                        .HasForeignKey("DiscountId");

                    b.HasOne("api.Models.Employee", "Employee")
                        .WithMany("Services")
                        .HasForeignKey("EmployeeId");

                    b.HasOne("api.Models.Merchant", "Merchant")
                        .WithMany("Services")
                        .HasForeignKey("MerchantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.Tax", "Tax")
                        .WithMany("Services")
                        .HasForeignKey("TaxId");

                    b.OwnsOne("api.Models.Price", "Price", b1 =>
                        {
                            b1.Property<int>("ServiceId")
                                .HasColumnType("integer");

                            b1.Property<decimal>("Amount")
                                .HasColumnType("decimal(18, 2)");

                            b1.Property<int>("Currency")
                                .HasColumnType("integer");

                            b1.HasKey("ServiceId");

                            b1.ToTable("Services");

                            b1.WithOwner()
                                .HasForeignKey("ServiceId");
                        });

                    b.Navigation("Category");

                    b.Navigation("Discount");

                    b.Navigation("Employee");

                    b.Navigation("Merchant");

                    b.Navigation("Price")
                        .IsRequired();

                    b.Navigation("Tax");
                });

            modelBuilder.Entity("api.Models.Tax", b =>
                {
                    b.HasOne("api.Models.Merchant", "Merchant")
                        .WithMany("Taxes")
                        .HasForeignKey("MerchantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Merchant");
                });

            modelBuilder.Entity("api.Models.Category", b =>
                {
                    b.Navigation("Products");

                    b.Navigation("Services");
                });

            modelBuilder.Entity("api.Models.Customer", b =>
                {
                    b.Navigation("Reservations");
                });

            modelBuilder.Entity("api.Models.Discount", b =>
                {
                    b.Navigation("Products");

                    b.Navigation("Services");
                });

            modelBuilder.Entity("api.Models.Employee", b =>
                {
                    b.Navigation("Reservations");

                    b.Navigation("Services");
                });

            modelBuilder.Entity("api.Models.GiftCard", b =>
                {
                    b.Navigation("Payments");
                });

            modelBuilder.Entity("api.Models.Merchant", b =>
                {
                    b.Navigation("Categories");

                    b.Navigation("Customers");

                    b.Navigation("Discounts");

                    b.Navigation("Employees");

                    b.Navigation("GiftCards");

                    b.Navigation("OrderDiscounts");

                    b.Navigation("Orders");

                    b.Navigation("Products");

                    b.Navigation("Services");

                    b.Navigation("Taxes");
                });

            modelBuilder.Entity("api.Models.Order", b =>
                {
                    b.Navigation("OrderItems");

                    b.Navigation("Payments");
                });

            modelBuilder.Entity("api.Models.Payment", b =>
                {
                    b.Navigation("Refund");
                });

            modelBuilder.Entity("api.Models.Product", b =>
                {
                    b.Navigation("ProductVariants");
                });

            modelBuilder.Entity("api.Models.ProductVariant", b =>
                {
                    b.Navigation("OrderItems");
                });

            modelBuilder.Entity("api.Models.Reservation", b =>
                {
                    b.Navigation("Payments");
                });

            modelBuilder.Entity("api.Models.Service", b =>
                {
                    b.Navigation("Reservations");
                });

            modelBuilder.Entity("api.Models.Tax", b =>
                {
                    b.Navigation("Products");

                    b.Navigation("Services");
                });
#pragma warning restore 612, 618
        }
    }
}
